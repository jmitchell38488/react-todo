const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    crypto = require('crypto'),
    cors = require('cors');

class ApiError extends Error {

    constructor(message, status, data) {
        super(message);
        this.statusCode = status;
        this.payload = data || null;
    }

    get data() {
        return this.payload;
    }

    get status() {
        return this.statusCode;
    }

    set status(status) {
        this.statusCode = status;
    }

    set data(payload) {
        return this.payload;
    }
}

class ApiResponse {

    constructor(status = 200) {
        this.responseData = {
            status: status,
            message: null,
            data: null
        };
    }

    set status(status) {
        this.responseData.status = status;
    }

    set message(message) {
        this.responseData.message = message;
    }

    set data(data) {
        this.responseData.data = data;
    }

    get status() {
        return this.responseData.status;
    }

    get json() {
        let response = {
            status: this.responseData.status
        };

        if (this.responseData.message !== null) {
            response.message = this.responseData.message;
        }

        if (this.responseData.data !== void 0 && Array.isArray(this.responseData.data)) {
            response = Object.assign({}, response, {
                list: this.responseData.data,
                count: this.responseData.data.length
            });
        } else if (this.responseData.data !== void 0) {
            response.data = this.responseData.data;
        }

        return response;
    }
}

class Store {

    constructor() {
        this.items = [];
        this.count = 0;
    }
    
    static keysSave() {
        return ['id', 'title', 'completed', 'created', 'updated'];
    }

    static keysAdd() {
        return ['title', 'completed'];
    }

    static defaultItem() {
        return {
            id: '',
            title: '',
            completed: false
        };
    }

    static validate(item, keys) {
        // Let's just check that we've got a valid object first
        try {
            Object.keys(item).forEach(e => {
                if (~keys.indexOf(item)) {
                    throw new Error('Not valid');
                }
            });
        } catch (err) {
            return false;
        }

        let id = item.id !== void 0 && item.id.length === 16;
        let title = item.title !== void 0 && item.title.length > 0;
        let completed = item.completed !== void 0 && (item.completed === false || item.completed === true);

        return ((id && title && completed) || (title && completed)) && Object.keys(item).length <= keys.length;
    }

    static genUid() {
        return crypto.randomBytes(16).toString("hex");
    }

    all() {
        return this.items;
    }
    
    get length() {
        return this.count;
    }

    findById(id) {
        if (this.count === 0) {
            return false;
        }

        return this.items.find(e => e.id === id);
    }

    add(item) {
        if (!Store.validate(item, Store.keysAdd())) {
            return false;
        }

        item = Object.assign({}, Store.defaultItem, item, {
            created: new Date(),
            updated: new Date(),
            id: Store.genUid()
        });

        this.items.push(item);
        this.count++;

        // Return newly added item
        return item;
    }

    update(item) {
        if (!this.contains(item.id)) {
            return false;
        }

        item = Object.assign({}, Store.defaultItem, item, {
            updated: new Date()
        });

        if (!Store.validate(item, Store.keysSave())) {
            return false;
        }

        this.items = this.items.map(e => e.id === item.id ? item : e);

        // Return updated item
        return item;
    }
    
    delete(id) {
        if (!this.contains(id)) {
            return false;
        }

        let item = this.findById(id);

        this.items = this.items.filter(e => e.id !== id);
        this.count--;

        // Return deleted item
        return item;
    }

    contains(id) {
        if (this.count === 0) {
            return false;
        }
        
        let item = this.items.find(e => e.id === id);
        return item !== void 0 && item !== false;
    }
}

const itemStore = new Store();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log('[%s] %s', req.method, req.url);
    next();
});

app.options('/', cors());
app.options('/item', cors());
app.options('/item/:id', cors());

app.get('/items', cors(), (req, res, next) => {
    let response = new ApiResponse();
    response.data = itemStore.all();
    next(response);
});

app.get('/item/:id', cors(), (req, res, next) => {
    let item = itemStore.findById(req.params.id);
    if (!item) {
        next(new ApiError('Could not find item ' + req.params.id, 404));
    } else {
        let response = new ApiResponse();
        response.data = item;
        next(response);
    }
});

app.put('/item/:id', cors(), (req, res, next) => {
    let item = itemStore.findById(req.params.id);
    if (!item) {
        next(new ApiError('Could not find item ' + req.params.id, 404));
        return;
    }

    let upItem = Object.assign({}, item, req.body);
    upItem.id = item.id;

    item = itemStore.update(upItem);
    if (!item) {
        next(new ApiError('Could not save item, title and completed are required', 400, item));
    } else {
        let response = new ApiResponse();
        response.message = 'Item successfully updated!';
        response.data = item;
        next(response);
    }

});

app.post('/item', cors(), (req, res, next) => {
    let item = itemStore.add(req.body);
    if (!item) {
        next(new ApiError('Could not save item, title and completed are required', 400, item));
    } else {
        let response = new ApiResponse();
        response.message = 'Item successfully added!';
        response.data = item;
        next(response);
    }
});

app.delete('/item/:id', cors(), (req, res, next) => {
    let item = itemStore.delete(req.params.id);
    if (!item) {
        next(new ApiError('Could not remove item, record id ' + req.params.id + ' could not be found', 400, item));
    } else {
        let response = new ApiResponse();
        response.message = 'Item successfully deleted!';
        response.data = item;
        next(response);
    }
});

app.use((err, req, res, next) => {
    let list = [
        {key: 'Cache-Control', value: 'no-cache, public, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'},
        {key: 'Access-Control-Allow-Origin', value: '*'},
        {key: 'Access-Control-Allow-Headers', value: 'Origin, X-Requested-With, Content-Type, Accept'},
        {key: 'Content-Type', value: 'application/json'}
    ];

    list.forEach(item => res.set(item.key, item.value));
    next(err);
});

app.use((req, res, next) => {
    // This route should only be triggered when a requested URL is not found
    next(new ApiError('Resource not found', 404));
});

app.use((err, req, res, next) => {
    // This route should only be triggered when a requested URL is not found
    if (!err) {
        next(new ApiError('Resource not found', 404));
    } else {
        next(err);
    }
});

app.use((passthru, req, res, next) => {
    if (passthru instanceof ApiResponse) {
        res.status(passthru.status).json(passthru.json);
        return;
    }

    console.error(passthru.message);

    let body = {
        status: passthru instanceof ApiError ? passthru.status : 400,
        message: passthru.message
    };

    if (passthru instanceof ApiError && passthru.data) {
        body.data = passthru.data;
    }

    if (!res.headersSent) {
        res.status(404).json(body);
    }

    // All good here, so just end the response
    res.end();
});

app.listen(8000);
console.log('Listening on 8000!');