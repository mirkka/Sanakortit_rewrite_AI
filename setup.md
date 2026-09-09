# General
- install all necessary NPM packages
- always ask if you need more information, do not guess
- you can also create example files if needed
- use node version 24
- use Lodash instead of native methods if possible
- use Luxon for time and dates

## Frontend setup
1. Set up webpack, webpack dev server and babel as compiler. Use Typescript and React. Add package.json and package.lock.json. Make sure that packages are correctly placed in dependencies or devDependencies. Use Sass as css preprocessor. Add npm start script into package.json. Use react-router-dom for routing.
2. Add and set up Redux toolkit
3. Add and set up Prettier
4. Add and set up Eslint
5. Add and update Gitignore

## Backend setup
1. Install and set local development environment with AWS CDK
2. Add AWS lambda function and set up Apollo server that can run in AWS lambda. Name the file graphql.
3. Set up Apollo client in /client. Create example graphql query to verify that backend and frontend can communicate
4. Install and set up graphql-codegen both on client and server

## Datasources and persistance
1. Add local DynamoDB setup.
2. Configure graphql data source to use the database that was set up in previous step. Congigure this so that in local environment data source is local DynamoDB and in cloud it's AWS DynamoDB service.
3. Create deck table. Schema: deck id (uuid), name (name of the deck), user id (uuid), created at, updated at
4. Create card table. Schema: deck id (uuid), card id (uuid), text, text translation, weight (number), created at, updated at

## Backend functionality
Make sure all queries and mutations are user specific. For now, include user id in every request as parameter. In the future, user id will be obtained from auth token. Do not modify or return any rows that do not belong to the user that is making the request. There is no user management yet, so you can hard code random uuid string to be used everywhere for now. Add error handling for incorrect requests - no card with given id, no deck id found etc.
1. Add create deck mutation. Deck name is sent from frontend.
2. Add add card mutation. Parameters - text, text translation and deck id. All new created cards have weight 3.
3. Add delete deck mutation. Deletion by deck id. Delete also all cards that belong to that deck. 
4. Add delete card mutation. Deletion by card id.
5. Add update card mutation. This mutation is updating only text and text translation fields.
6. Add get decks query.
7. Add get deck by Id query.
8. Add get cards for deck query. Query by deck id.

## Frontend functionality
General instructions:
- structure Redux store in slices per domain - deck, card, study
- keep components generic and re-usable if possible
- create presentation components, keep them as pure as possible. Business logic should be defined in service files
- use Ant design default components. Do not worry about styling. UI will be polished later
- if a component requires external context, use Redux selectors, instead of passing the props
- use React hooks only within component context. If something has side effect outside of the component, use Redux action
- avoid duplication. If some functionality is shared between two or more components, create a generic function in services or helper

UI component structure:
- list deck view - this is a landing page
- study view/card view - fliping through the cards in the deck
- create/edit card form
- create/edit deck form
- login/create account page

1. Set up Graphql cache. All queries should be cache-first

2. Install Ant design

3. Add last studied field to get decks query and get deck by id query. Last studied date is a timestamp from the card in the deck that has the latest updated_at timestamp.

4. Add number of cards field to get decks query and get deck by id query. 

5. Add list decks page
UI: List of all decks for user wigth deck name, number of cards in deck, last studied date in format DD/MM/YYYY
Functionality: sort decks alphabetically.

6. Add create deck form page
UI: Deck name field, OK and cancell buttons
Functionality: OK button triggers create deck mutation. After form is closed or submitted, redirect user to list deck page and make sure that deck list is refeshed, containing newly created deck.

7. Add card form page
UI: text field, text translation field, OK and cancell buttons.
Functionality: OK button fires add card mutation. After form is cancelled, return to deck list page. If OK is clicked, open new add card form for adding the next card to the same deck.

8. Add add card button to each deck item on the deck list page. Clicking the button opens add card form created in previous step.

9. Add add deck button at the bottom of the list deck list page. Clicking the button opens add deck form created in previous step.

10. Study view/card view
UI: In initial state, only value of the text field and flip card button is visible. After card is flipped, flip card button disappears, translation text is displayed under the text, difficulty buttons - done, good, medium, hard are shown.
Functionality: Deck ID is in url. Clicking any of the difficulty rating buttons moves to the next card and also updates the card's weight as follows:
done - 0
good - 1
medium - 2
hard - 3
After all the cards in the deck have been displayed, display "You have finished the deck" message as a separate "card" without any buttons, just the text. Then return user to the deck list page. Make sure last studied timestamp for the deck is refreshed.

11. Start study button
UI: Add Start study button to each item on deck list page. 
Functionality: clicking the button redirect to study view described in previous step. Deck id is in url: ./study/deckUUID

12. Add Finish study button to the card for both initial and flipped states. Clicking the button exits the study view and redirects user to deck list page.

13. Edit card form
UI: create card form with prefilled current values (text and text translation), OK and cancel buttons.
Functionality: after cancel return to card view. OK button fires update card mutation. After update, return to card view, make sure values are refreshed. 

14. Add edit card button to card view. Button is visible in both initial and flipped stages. Clicking the button opens edit card form.

15. Edit deck form
UI: create card form with prefilled current values (name), OK and cancel buttons.
Functionality: after cancel return to deck list page. OK button fires update deck mutation. After update, return to deck list page, make sure values are refreshed.

16. Add edit deck button to deck item on deck list page. Clicking the button opens edit deck form created in previous step.

17. Rolling the cards alghoritm and deck status
In study mode, cards with higher difficulty should be shown more often. Cards should be in general rolled in random order, but with bias towards higher difficulty cards. Study session should be finished automatically only once all cards in the deck are marked done. Also, cards marked as done are no longer shown to the user. After study is finished, the same "You have finished the deck" message is displayed and user is redirected back to deck list page. If all cards in the deck have weight 0, deck is marked as finished into the new column "Status" in the deck item. For finished decks, Start study button text is Restart study. Clicking restart study resets all card weights back to level 3 and opens study view, business as usual from this poin on. 

Deck statuses:
If all cards are done - finished

This information is derived from average weight of the cards in the deck:
Most cards good - good
Most cards medium - medium
Most cards hard - hard

## Styling UI
Design guidelines:
- create Ant Design theme if applicable
- use css modules (sass) if adding custom css
- application will be primarily used on mobile phone, secondary on tablet
- prefer light, warm colors
- no need for fancy transitions or animations except for loaders
- avoid borders for form input fields. Use just underline
- no need to think about accessibility
- add cat somewhere

Deck list page:
- most prominent information is deck name, status and start study/restart study action buttons. Other actions are secondary, so the buttons do not have to be so prominent. Deck items should be styled as cards, not as table.
- use infinite scroll instead of pagination

Study view
- in initial state most prominent information is the text. Flip card button should be easily accessible on mobile phone using just one hand. 
- in flipped state, most prominent is the translation text. Difficulty rating buttons should be easily accessible on mobile phone using just one hand. These are the most prominent actions. Other actions (finish study, edit card) are less prominent.

## Styling edits
- add line between text and translation text in the study view
- Difficulty rating buttons should further apart. I have sausage fingers and will most likely miss-click. You can also make them bigger.
- also disable all buttons while there is a request in flight. App is very slow locally, and it's bad UX that I do not know what's going on after I clicked the button. User also might click the button multiple times while initial requst is being processed. This may cause serious bugs.
- cat icon looks like hamster. Pls use more cat like icon
- change date format to d.m yyyy and add label Last studied
- change Edit to Edit deck
- use Ant Design icon component instead of emojis
- change difficulty rating buttons colors - Done - white, Good - green
- use <Spin indicator={<LoadingOutlined spin />} size="large" /> for loader animation. Center loader in the middle of the page.

## Infrastructure
1. AWS deployment setup
2. website hosting in S3
- there is a registered domain cicushik.com in Route 53. Application URL should be - cicushik.com/sanakortit

## Access management
1. Set up AWS Cognito - Sign in and import customer user data with OAuth 2.0 social sign in with Google
2. Add Sign in page for non-authenticated users, with above mentioned OAuth 2.0 social sign-in options Google
3. Replace currenlty hardcoded userId with identity (ID) token
- token expiration is 1 day
- make sure all api return user specific content from DB, meaning only decks and cards that belong to the current user
- make sure non-authenticated user can't see or use any queries or mutations
- non-authenticated users should be automatically redirected to sign-in page


## UI tweaks
- remove labels and required asterisk from add card form. 
- "Add" button should be disabled until both fields are filled
- update title "Add Card" in add card form to include deck name -> Add card to deck <deck name>
- remove sign out button and make user email clickable. After clicking the name, dropdown opens with one option to sign out
- remove Edit Deck title from edit deck form
- remove labels and required asterisk from edit deck form. "Save" button should be disabled if field is empty
- same for new deck form - remove tile, labels and and "Create" button is disabled when field is empty. Also change placeholder text to "Deck name - e.g. Finnish vocabulary"