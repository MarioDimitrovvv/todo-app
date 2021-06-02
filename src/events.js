export default {
    callbacks: {},
    subscribe(eventName, callback) {
        if (!this.callbacks[eventName]) {
            this.callbacks[eventName] = [];
        }
        this.callbacks[eventName].push(callback);
    },
    unsubscribre(eventName, callback) {
        this.callbacks[eventName] &&
        this.callbacks[eventName].filter((fn) => fn !== callback);
    },
    emit(eventName, data = null) {
        if (this.callbacks && this.callbacks[eventName]) {
            Object.values(this.callbacks[eventName]).forEach(callback => {
                callback(data);
            })
        }
    }
}