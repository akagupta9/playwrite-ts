# Web Automation using Playwright

### What is this repository for?

- A Test automation suite with base framework of Playwright.
- Version 1.0.0

### How do I get set up?

#### Pre-requisite

1. Node Version 16
2. Git installation
3. IDE (Ex. Vs Code, Sublime, atom) - anyone you can install. Prefer VS Code

#### Steps

1. Take a clone
2. Go to your directory and install node modules by running command `npm i`
3. Run command ``` npm run prepare-husky``` to installed husky git hooks

### How to run Tests?

1. Run command `npm i` if node modules folder is not present
2. To run Test cases - hit command `npm run test`
4. Run command `npm run generate-report` to generate report

##### Commit to Git - Guidelines
1. Husky with CommitLint is integrated. As per rules , Commit message will be accepted in format -
           ``` type(scope): subject  ```
  eg. ``` feature(admin page) : Created Common Components```

### Tech

For automation we are using following Tech Stack:

- [TypeScript/JavsScript](https://www.typescriptlang.org/docs/)
- [playwright](https://playwright.dev/)

