# Front -end

How to run the frontend:

* npm install
* npm start
* App will run on localhost:3000

Features:

* Handles websockert using apollo client
* All forms  handle their require fields validation
* Custom hooks were implemented:
  * useFormReducer: handles state from forms
  * useMutationHelper: handles mutations requested to apollo client
* Some components such as BasicTable contain performance hooks, such as memos