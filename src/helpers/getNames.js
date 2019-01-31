export default cb => {
    return fetch('/api/stock/names')
        .then(response => response.json().then(data => cb(data)))
};