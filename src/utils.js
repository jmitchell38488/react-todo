export const Utils = {

    pluralize: (count, word) => {
        return count === 1 ? word : word + 's';
    }

};

export const ALL_TODOS = 'all';
export const ACTIVE_TODOS = 'active';
export const COMPLETED_TODOS = 'completed';
export const ESCAPE_KEY = 27;
export const ENTER_KEY = 13;