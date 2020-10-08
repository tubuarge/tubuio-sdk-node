<p align="left" style="margin: 10px 0 25px 0">
  <a href="https://github.com/tubuarge/folder-builder">
    <img alt="tubu.io logo" src="./logo.png" width="200"/>
  </a>
</p>

JavaScript SDK for [tubu.io](https://www.tubu.io)

## Example Usage

```js
const Tubu = require('@tubu/tubuio-sdk-node');

// Create a new Tubu instance with api key
const app = new Tubu('APP_API_KEY');

// Create a new contract instance with the shortID
const contract = app.contract('CONTRACT_SHORTID');

// Call a send method from contract
contract
    .send('METHOD_NAME', { args: [], account: 'ACCOUNT_ADDRESS' })
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
```

For more details visit the [docs page](https://tubuarge.github.io/tubuio-sdk-docs/#/node).

## License

[MIT](LICENSE)
