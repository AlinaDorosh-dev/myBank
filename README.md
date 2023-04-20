![Banner](https://github.com/AlinaDorosh-dev/myBank/blob/frontend/public/img/banner.jpeg)

## **Description**

This is a responsive banking app. Built as a personal project to improve practical skills in REST API design with [Node.js](https://nodejs.org/en) and [Express](https://expressjs.com/). Using [MongoDB](https://www.mongodb.com/) for database management. Database is deployed in MongoDB Atlas in order to perform multi-document **ACID transactions**. 
 Frontend development with [React](https://react.dev/) and [MUI](https://mui.com/), also implements [Axios](https://www.axios.com/) for fetching API

 Includes next functionality:

:large_blue_diamond: Create new user account with email and password

:large_blue_diamond: Finish registration by filling multistep form with personal data

:large_blue_diamond: Login with email and password

:large_blue_diamond: Create up to 3 bank accounts(Account is created with initial balance 100€ for testing transactions)
 
:large_blue_diamond: Transfer money to other users and between your accounts

:large_blue_diamond: Check your balance

:large_blue_diamond: Check transactions history

:large_blue_diamond: Get notifications about new incoming transactions

## **Installation** :building_construction:	
### Backend :construction_worker_woman:
:bangbang: In order to run the project you need to connect to your [MongoDB Atlas cluster](https://www.mongodb.com/atlas/database), as here are implemented MongoDB  multi-document ACID transactions, which are not suported for database in localhost.

Inside folder `backend/` run following command:

```bash
npm install
```
create `.env` file with following environment variables: 
```bash
DATABASE_URL=[your mongodb string(ex. mongodb+srv://<username>:<password>@<claster>.vc6yde2.mongodb.net/myBank?retryWrites=true&w=majority)]

NODE_ENV=development
ACCESS_TOKEN_SECRET=[your token secret (can be generated using node crypto module)]

```

run the following command, and the server will be listening on the PORT `8000`:
```bash
npm run start
```

### Frontend :woman_artist:
Inside folder `frontend/` run following commands:

```bash
npm install
```
```bash
npm start
```

### Styles :art: and layout :pencil:
All styles and layout created with customized MUI components

### Project structure :package:

```
📦backend
 ┣ 📂config
 ┃ ┣ 📜allowedOrigins.js
 ┃ ┗ 📜dbConn.js
 ┣ 📂controllers
 ┃ ┣ 📜account.controller.js
 ┃ ┣ 📜auth.controller.js
 ┃ ┣ 📜notification.controller.js
 ┃ ┣ 📜transaction.controller.js
 ┃ ┗ 📜user.controller.js
 ┣ 📂middleware
 ┃ ┣ 📜errorHandler.js
 ┃ ┣ 📜logger.js
 ┃ ┣ 📜loginLimiter.js
 ┃ ┗ 📜verifyToken.js
 ┣ 📂models
 ┃ ┣ 📜account.model.js
 ┃ ┣ 📜notification.model.js
 ┃ ┣ 📜transaction.model.js
 ┃ ┗ 📜user.model.js
 ┣ 📂routes
 ┃ ┣ 📜account.routes.js
 ┃ ┣ 📜auth.routes.js
 ┃ ┣ 📜notification.routes.js
 ┃ ┗ 📜transaction.routes.js
 ┣ 📂utils
 ┃ ┣ 📜ageValidation.js
 ┃ ┗ 📜jwt.js
 ┣ 📜.env
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜server.js
```
```
📦frontend
 ┣ 📂public
 ┃ ┗ 📜index.html
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📜myBankApi.js
 ┃ ┣ 📂auth
 ┃ ┃ ┗ 📜RequireAuth.js
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂account_management
 ┃ ┃ ┃ ┣ 📂accounts_tab
 ┃ ┃ ┃ ┃ ┣ 📜AccountsTab.js
 ┃ ┃ ┃ ┃ ┗ 📜NewAccountBtn.js
 ┃ ┃ ┃ ┣ 📂notifications_tab
 ┃ ┃ ┃ ┃ ┣ 📜NotificationsTab.js
 ┃ ┃ ┃ ┃ ┗ 📜NotificationsTable.js
 ┃ ┃ ┃ ┣ 📂profile_tab
 ┃ ┃ ┃ ┃ ┗ 📜ProfileTab.js
 ┃ ┃ ┃ ┣ 📂transactions_tab
 ┃ ┃ ┃ ┃ ┣ 📂new_transaction
 ┃ ┃ ┃ ┃ ┃ ┣ 📜NewTransactionForm.js
 ┃ ┃ ┃ ┃ ┃ ┣ 📜TransactionConfirmation.js
 ┃ ┃ ┃ ┃ ┃ ┗ 📜TransactionCreation.js
 ┃ ┃ ┃ ┃ ┣ 📂transactions_history
 ┃ ┃ ┃ ┃ ┃ ┣ 📜TransactionsHistory.js
 ┃ ┃ ┃ ┃ ┃ ┗ 📜TransactionsTable.js
 ┃ ┃ ┃ ┃ ┗ 📜TransactionsTab.js
 ┃ ┃ ┃ ┣ 📜AccountManagement.js
 ┃ ┃ ┃ ┗ 📜DashboardDrawer.js
 ┃ ┃ ┣ 📂forms
 ┃ ┃ ┃ ┣ 📂finish_register
 ┃ ┃ ┃ ┃ ┣ 📜HorizontalLinearStepper.js
 ┃ ┃ ┃ ┃ ┗ 📜RegisterForm.js
 ┃ ┃ ┃ ┣ 📜LoginForm.js
 ┃ ┃ ┃ ┗ 📜SignUpForm.js
 ┃ ┃ ┣ 📜About.js
 ┃ ┃ ┣ 📜Contact.js
 ┃ ┃ ┣ 📜Footer.js
 ┃ ┃ ┣ 📜Header.js
 ┃ ┃ ┣ 📜Home.js
 ┃ ┃ ┗ 📜Layout.js
 ┃ ┣ 📂context
 ┃ ┃ ┣ 📜AccountsProvider.js
 ┃ ┃ ┣ 📜AuthProvider.js
 ┃ ┃ ┣ 📜NewTransactionProvider.js
 ┃ ┃ ┣ 📜NotificationProvider.js
 ┃ ┃ ┣ 📜RegistrationProvider.js
 ┃ ┃ ┗ 📜TransactionsProvider.js
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜useAuth.js
 ┃ ┃ ┗ 📜useAxios.js
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜AboutPage.js
 ┃ ┃ ┣ 📜AccountManagementPage.js
 ┃ ┃ ┣ 📜ContactPage.js
 ┃ ┃ ┣ 📜ErrorPage.js
 ┃ ┃ ┣ 📜FinishRegistration.js
 ┃ ┃ ┣ 📜HomePage.js
 ┃ ┃ ┣ 📜Login.js
 ┃ ┃ ┣ 📜SignUp.js
 ┃ ┃ ┗ 📜Unauthorized.js
 ┃ ┣ 📂reducers
 ┃ ┃ ┗ 📜signUpReducer.js
 ┃ ┣ 📂styles
 ┃ ┃ ┗ 📜modalStyle.js
 ┃ ┣ 📂theme
 ┃ ┃ ┗ 📜theme.js
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜ageValidation.js
 ┃ ┃ ┗ 📜regex.js
 ┃ ┣ 📜9729.jpg
 ┃ ┣ 📜App.js
 ┃ ┣ 📜config.js
 ┃ ┗ 📜index.js
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜package-lock.json
 ┗ 📜package.json
 ```
