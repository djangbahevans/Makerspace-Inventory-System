export default cb => {
    return fetch('/api/stock/names', {
        credentials: "same-origin"
    })
        .then(response => response.json().then(data => cb(data)))
};