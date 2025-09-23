# typescript MERN eCommerce

## Lessons

1. Introduction
2. Install tools
3. Create TypeScript React App By Vite
4. Create Git Repository
   1. add README.md
   2. create github account
   3. connect vs code to github
   4. publish repository
5. List products
   1. create product type
   2. create products array
   3. add product images
   4. render products
6. Add Page Routing
   1. npm i react-router-dom
   2. create route for home page
   3. create router for product page
   4. add helmet for setting page title
7. Create Node Server

   1. create backend folder
      cd backend
      npm init

   2. config typescript
      npm install --save-dev typescript ts-node-dev
      create tsconfig.json

   ```json
   {
      "compilerOptions":
      {
         "target" : "es2015",
         "outDir" : "/.build",
         "strict" : true,
         "module" : "commonjs",
         "esModuleInterop : true
      }
   }
   ```

   add dev and build command to package.json
   `"dev": "ts-node-dev --respawn --transpile-only --fles src/index.ts",`

   3. config eslint
      npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
      create .eslintrc.js

```json

module.exports = {
   env: {
      es2016: true,
      node: true,
   },
   extends: ['eslint:recommended', 'pulgin:@typescript-eslint/recommended'],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaVersion: es2016',
      sourceType: 'module',
   },
   plugins: ['@typescript-eslint'],
}

```

8. Create express server
   npm install express
   npm install --save-sev @types/express

   create src/index.ts
   copy data.ts and Product.ts from frontend to backend

```js
import express, { request, Response } from 'express'
import { sampleProduct } from './data'
const app = express()
app.get('/api/product', (req: Request, rest: Response) => {
  res.json(sampleProducts)
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})

   command: npx tsc
   command: node build/index.js

```

9. Fetch Products
   Open by cd in terminal "cd frontend"

   1. install axios

      npm install axios
      in main.tsx

      ```js
      axios.defaults.baseURL =
        process.env.NODE_ENV === 'development' ? 'https://localhost:4000' : '/'
      ```

   2. define types in HomePage
      frontend/pages/HomePage

   3. define initial state and reducer in HomePage.tsx
      frontend/pages/HomePage

   4. define get error functon
      create types/ApiError.ts

      frontend/pages/HomePage

   5. create utils.ts
   6. fetch products
   7. refine return statement
      replace sampleProducts with products

10. create Rating product component

    1. Rating.js

11. create Product page

    1. npm i react-helmet-async
    2. main.tsx
    3. HomePage.tsx

12. load Products by react Query

    1. npm install @tanstack/react-query --legacy-peer-deps
    2. main.tsx
    3. apiClient.ts
    4. hooks/ productHooks.ts

13. Create ProductPage

    1. index.ts (adds code)
    2. productHooks.ts (adds code)
    3. ProductPage.tsx (adds code)

14. Create React Context
    1. Store.ts
    2. light and dark mode button in app.tsx in nav bar

15. Connect MongoDB
      1. create mongodb database
      2. npm install dotenv mongoose @typegoose/typegoose
      3. put mongodb uri in .env
      4. MONGODB_URL=mongodb://localhost/tsmern
      5. index.js

      6. creating productModel.ts in backend
      7. npm i express-async-handler
      8. create productRouter.ts
      9. in index.ts add app.use ('/api/product', productRouter)
      10. run <http://localhost4000/api/product>  to check product array
      11. seedRouter.ts in backend/routers/...

16. Implement Add to Cart
      1. Cart.js
      2. Store.tsx (adding code)
      3. App.tsx (adding cart)
      4. utils.ts (export convertProductToCartItem)
      5. ProductItems.tsx (adding useContext ...  ctxDispatch)

17.  Add to Cart In productPage
      1. ProductPage.ts
      2. npm i react-toastify
      3. npm i react-router-bootstrap
      4. App.tsx

18.   Create Cart Page
      1. CartPage.tsx

19. Created Remove Button in CartPage

20. Create-User-Signin_Api
      1. userModel.ts
      2. npm i bcryptjs
      3. data.ts
      4. seed users in seedRouter.ts
      5. open http://localhost:4000/api/seed
      6. npm i jsonwebtoken
      7. add JWT_SECRET to .env file
      8. utils.ts

21.  create SigninPage.ts
22.  Register User
      1. userRouter.ts

23. Create Shipping Screen
      1. Cart.js
      2. Store.tsx

24. create paymentPage
      1. store.tsx
      2. shippingAddressPage.ts

25. Build-Order-Api
      1. orderModel.tsx

26. Create Place-Order-Page
   1. ProtectedRoute.tsx
   2. main.tsx

27. create OrderPage
      1. orderRouter.ts
      2. orderHooks.tsx
      3. OrderPage.tsx

28. Pay-order-by-SadaPay
      1. create SadaPay developer Account 
      2. get SadaPay Client id
      3. save in .env as SADAPAY_CLIENT_ID
      4. keyRouter.ts
      5. index.ts
      6. orderRouter.ts