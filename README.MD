## Purpose
Basic set up for Node.js projects using Typescript, Express and Mangoose.

To run:
```
npm run dev
```

## Initital steps to set up a new Typescript project:

1. Create package.json
```
npm init
```

2.  Install Typescript
```
npm install typescript --save-dev
```

3. Install Sucrase (Typescript transpiler)
```
npm install sucrase --save-dev
```

4. Create a src folder

5. Create a src/index.ts file

6. Install nodemon
```
npm install nodemon --save-dev
```

7. create nodemon.json file
```
{
    "watch": ["src"],
    "ext": "ts",
    "execMap":{
        "ts":"sucrase-node src/index.ts"
    }
}
```

8. Add dev and build script in package.json
```
"dev": "nodemon src/index.ts",
"build": "sucrase ./src -d ./dist --transforms typescript,imports"
```

9. Instal eslint
```
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

10. Configure es-lint
```
npx eslint --init
```
How would you like to use ESLint? · style       
- [x] What type of modules does your project use? · esm
- [x] Which framework does your project use? · none
- [x] Does your project use TypeScript? · Yes
- [x] Where does your code run? · browser
- [x] How would you like to define a style for your project? · guide
- [x] Which style guide do you want to follow? · standard
- [x] What format do you want your config file to be in? · JavaScript
- [x] Would you like to install them now with npm? · Yes

11. In .eslintrc.js, add this line for extends array:
```
"plugin:@typescript-eslint/recommended"
```

12.  install express, cors and mongoose
```
npm install express cors mongoose
```

13.  install typescript
```
npm i --save-dev @types/express @types/cors @types/mongoose
```
