# leo-graphql-explorer
Next.js + ChakraUI example app to present data fetched through GraphQL

See features below and full requirements the challenge brief below

## Features
- User registration form, gating of content until form is completed
  (data persisted via local storage, server-side storage is not used)
- GraphQL data fetching via Apollo Client
- Paginated display of fetched items, with mobile support
- Modal dialog with details for each item
- Side menu to allow navigation and edit user details

## Tech Stack
- Next.js 14
- Chakra UI
- Apollo Client
- TypeScript

## API
We are using https://rickandmortyapi.com/documentation/#graphql as a data sorce
(for demonstration purposes only).

## Development

Use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Setup
```bash
git clone https://github.com/paulitto/leo-graphql-explorer.git
cd leo-graphql-explorer
npm install
npm run dev
```

### Generating components with Chakra CLI
- use Chakra CLI version 3 or higher
- use --outdir ./components/chakra-ui
e.g. 
```bash
npx chakra snippet add alert-dialog --outdir ./src/components/chakra-ui
```

### Testing
to be added

## Deploy for prod

Deployed through vercel.

> Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) and [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js for more details.

## Steps
Build and verify
```bash
npm run build
npm run start
```
Deploy to vercel
```bash
npm install -g vercel
vercel login
vercel
```

# Challenge Brief

Challenge Brief (v3.5) Web Team

Please complete the following steps:
-	Please document your code appropriately. ✅
-	Set up a NextJS project using the App router with TypeScript. ✅
-	Ensure your project is set up with git. ✅
-	Use the ChakraUI component library for UI elements and styling. ✅
-	Ensure your product is responsive for mobile and desktop. ✅
-	Add a footer to your site that displays the challenge version. ✅
-	Have a blocking element (page/modal / etc) that prevents access to all other pages and data:
    -	On this blocking element, get a username and job title from the user. ✅
    -	Save the user’s username and job title information in a way you best see fit so the data persists between reloads. ✅
    -	Once the username and job title information has been entered, a user must be able to view this information in full. ✅
    -	A user must be able to change this information after submitting it. ✅
-	Use the Apollo client to query a public GraphQL API. ✅
-	Ensure that you pick a GraphQL API and data structure that provides images. ✅
-	Ensure the data and images are displayed. ✅
-	Ensure this data is not retrieved until the user has entered their username and job title information. ✅
-	Display the GraphQL API data as a paginated list of items on an “Information Page”. ✅
-	A user must be able to directly link (via URL) to a specific page of the paginated data. ✅
-	When an item is clicked on the “Information Page”, it must open a modal that displays the information about that item. ✅
-	Deploy on Vercel free tier. ✅

At Leonardo.Ai, we prefer to have as few dependencies as possible. Please follow this guideline during your test.
We will evaluate you on your ability to take initiative and consider the user experience, accessibility, and product quality as a whole. We will grade you as if this were a product you were publishing to production.
It is fine to use older versions of packages, such as Chakra 2 or Next 14, to complete the challenge.


Please select a public GraphQL API that contains images that you can display for each entry. Here are some APIs we suggest:
Name
Documentation
GraphQL “Try It!”
Documentation / Repository
AniList
Anime and manga datum, including character, staff, and live airing data.
https://anilist.co/graphiql 
https://anilist.gitbook.io/anilist-apiv2-docs/ 
React Finland
React Finland API is built with conferences and meetups in mind
https://api.react-finland.fi/graphql 
https://github.com/ReactFinland/graphql-api 
The Rick and Morty API
All the Rick and Morty information.
https://rickandmortyapi.com/graphql 
https://rickandmortyapi.com/documentation/#graphql 


Please ensure we can access your project and relevant code for grading. Feel free to leverage one of the many free Git hosting services, such as GitHub, to share your solution publicly. Please ensure we can access your project and relevant code for grading. Feel free to leverage one of the many free Git hosting services, such as GitHub, to share your solution publicly.