# Condition Builder

## Structure

The project follows an easy and simple modular structure with an Atomic approach, we have so far three folders:

### Components
Here you can find all the singular components used in the project, I tried to keep it as modular and simple as possible, and that's why I didn't want to exceed 100 lines per component.

As you can see, you can also find the Testing files for each of these components in this folder, I understand that this approach is not the best in a production environment because can generate confusion and noise. I gave myself the license to keep it this way on this project because is a small project with a very specific feature.

Regarding the testing, I performed general unit tests, in this case, I followed a BDD approach for preparing the challenge instead of a TDD.

### Containers
Being an application with only one purpose, the container folder only holds the App file, it is the central point of the application and is where the logic of the components are structured.

Just as in the Components folder, you can also see here the unit tests that are defined for the ```App.tsx```.

### Utils
In this folder you can find some functions of general use that I request in the components and some tests, I decided to move here those functions to reduce the complexity of some components and also to be able to use them in other components or unit tests in a cleaner way.

Also, in this folder, I decided to abstract the required interfaces for TypeScript, so I have all of them in one single file which is more scalable and maintainable. As you can see, managing a complex data structure for the filters pushes me to interconnect many of those interfaces, and having them centralized in one file helps a lot.

## Instructions

As with many regular projects that are started from a boilerplate, here you have the following scripts:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

If you want to run this project on your local machine you can clone this repo and you should run ```yarn install```and then ```yarn start```. However, for security and practical reasons, you can also check the live demo of the project here: https://condition-builder-8e664ss14-lufernandomgs-projects.vercel.app/


## Potential Improvements

I like to have a "Product" vision always that I'm facing a new challenge and that's why I like to prioritize versatility and user experience, avoiding potential issues and crashes on the application.

However, if I wonder about how to scale this project for a production environment I would recommend:
- End to End testing
- Implementation of CI/CD pipeline which includes running all the tests before deploying
- Add tracking and analytics features to understand the behaviour of the user in the app, in this particular case, I suggest Hotjar for tools like the heat map
- Analytics to understand the main filters used by the users, so we can start thinking about how to add new value from that starting point
- Use TypeScript on strict mode and improve some validations to give more sturdiness
- Think about the server capacity, and allow auto-increment and a load-balancer to avoid downtime
- Better Form structure for validations and users' understanding, following the standards of the library used (Ant Design in this case)
- Add a more friendly layout, a menu, a tutorial and probably also a landing page to explain the platform
- The most important of all IMO -> Figure out a business model parting from this


Anyway, it has been a pleasure to face this challenge and it was super fun! Looking forward to talk about it with you all 🙌🏻
