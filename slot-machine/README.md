# js-game-slot-machine
ES6 module based slot machine, with results fetched from an API -- or in this case, a JSON file

## General guidelines

- No external libraries or framework can be used
- ES6 is not mandatory but encouraged
- The user must be able to trigger a request for outcome to the server
- The outcome must be displayed to the user using the provided graphical resources
- The type of win must be displayed to the user (No Win, Small Win, Big Win)
- A bonus feature must be implemented. If the server returns bonus, the client must first display any
win to the user, then trigger an additional request without any user input (this must also be indicated
to the user in some form)
