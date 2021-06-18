# VetAPI
## Description
This is our second project for the [Reboot Academy](https://reboot.academy) bootcamp, Pet API.

Our project is an API that takes care of the management of a veterinary clinic. The main idea was to solve the problem that many users have to deal with the reports and treatments of their pets, and also to help veterinary clinics in the management of their users, pets, treatments and tests.

## Installation
Run `npm install` in your console and the magic will begin.

## Technologies
- Node
- Express
- MongoDB

## Data Model

### Users
| Key          | Type       | Reference      | Required | Validation               |
| ------------ | ---------- | -------------- | -------- | ------------------------ |
| \_id         | ObjectId   |                | False    |                          |
| email        | String     |                | True     | Regex, Unique            |
| password     | String     |                | True     |                          |
| firstName    | String     |                | False    |                          |
| lastName     | String     |                | False    |                          |
| userName     | String     |                | True     |                          |
| phone        | String     |                | False    |                          |
| mobile       | String     |                | False    |                          |
| role         | String     |                | True     | enum: [admin, vet, user] |
| pets         | [ObjectId] |                | False    |                          |
| address      | Object     | Address Object | True     |                          |

##

### Addresses
| Key          | Type       | Reference      | Required | Validation               |
| ------------ | ---------- | -------------- | -------- | ------------------------ |
| \_id         | ObjectId   |                | False    |                          |
| direction    | String     |                | True     |                          |
| city         | String     |                | True     |                          |
| state        | String     |                | False    |                          |
| country      | String     |                | False    |                          |

##

### Pets
| Key          | Type       | Reference      | Required | Validation               |
| ------------ | ---------- | -------------- | -------- | ------------------------ |
| \_id         | ObjectId   |                | False    |                          |
| name         | String     |                | True     |                          |
| birthdate    | Date       |                | True     |                          |
| species      | String     |                | True     |                          |
| breed        | String     |                | False    |                          |
| alive        | Boolean    |                | True     | Default: True            |
| description  | String     |                | False    |                          |
| alergies     | [String]   |                | False    |                          |
| notes        | [ObjectId] | Notes          | False    |                          |
| record       | [ObjectId] | Cases          | False    |                          |

##

### Cases
| Key          | Type       | Reference         | Required | Validation            |
| ------------ | ---------- | ----------------- | -------- | --------------------- |
| \_id         | ObjectId   |                   | False    |                       |
| date         | Date       |                   | True     |                       |
| diet         | String     |                   | False    |                       |
| habitat      | String     |                   | False    |                       |
| purpose      | String     |                   | True     |                       |
| observations | String     |                   | False    |                       |
| treatments   | [ObjectId] | Treatments        | False    |                       |
| tests        | [ObjectId] | Tests             | False    |                       |
| vet          | ObjectId   | User              | False    |                       |
| vitalSigns   | Object     | VitalSigns Object | False    |                       |

##

### VitalSigns
| Key           | Type       | Reference      | Required | Validation              |
| ------------- | ---------- | -------------- | -------- | ----------------------- |
| \_id          | ObjectId   |                | False    |                         |
| weight        | Number     |                | False    |                         |
| height        | Number     |                | False    |                         |
| temperature   | Number     |                | False    |                         |
| heartRate     | Number     |                | False    |                         |
| breathingRate | Number     |                | False    |                         |

##

### Notes
| Key           | Type       | Reference      | Required | Validation              |
| ------------- | ---------- | -------------- | -------- | ----------------------- |
| \_id          | ObjectId   |                | False    |                         |
| date          | Date       |                | True     |                         |
| author        | ObjectId   | Users          | True     |                         |
| public        | Boolean    |                | True     | Default: false          |
| text          | String     |                | True     |                         |

##

### Tests
| Key           | Type       | Reference      | Required | Validation              |
| ------------- | ---------- | -------------- | -------- | ----------------------- |
| \_id          | ObjectId   |                | False    |                         |
| date          | Date       |                | True     |                         |
| type          | String     |                | True     |                         |
| description   | String     |                | True     |                         |
| results       | String     |                | False    |                         |
| observations  | String     |                | False    |                         |
| vet           | ObjectId   | Users          | True     |                         |

##

### Treatments
| Key           | Type       | Reference      | Required | Validation              |
| ------------- | ---------- | -------------- | -------- | ----------------------- |
| \_id          | ObjectId   |                | False    |                         |
| startDate     | Date       |                | True     |                         |
| endDate       | Date       |                | False    |                         |
| type          | String     |                | True     |                         |
| description   | String     |                | True     |                         |
| observations  | String     |                | False    |                         |

##

## API Endpoints
All the endpoints are preceeded by `/api`.

- ### Auth

|Verb|Route|Description|Auth.|Body Params|Returns|Notes|
|-|-|-|-|-|-|-|
|POST|**/auth/signup**|Register a new User in the App|-|**username**, **email**, **password**, firstName, lastName, phone, mobile, address: { **direction**, **city**, state, country}|User created|- Endpoint ignores unexpected fields, _pets_ and _role_<br>- _address_ is not required, but if it is filled, **_city_** and **_direction_** will be _required_|
|POST|**/auth/login** |Log in with email and password|-|**email**, **password**|token, email, id|

##
- ### Case

|Verb|Route|Description|Auth.|Body Params|Returns|Notes|
|-|-|-|-|-|-|-|
|GET|**/cases** |Get a list of all Cases|Admin, Vet|-|List with all cases|
|GET|**/cases/:caseId** |Get a Case registered in the app by id|Admin, Vet, User|-|Case|_Regular User can only get Cases from her pets_|
|POST|**/cases** |Register a new Case in the app|Admin, Vet|**date**, observations, **purpose**, diet, habitat, tests, treatments, **vet**, vitalSigns|New Case|
|PUT|**/cases/:caseId** |Update a Case registered in the app by id|Admin, Vet|date, observations, purpose, diet, habitat, tests,treatments, vet, vitalSigns|Updated Case|
|DELETE|**/cases/:caseId** |Delete a Case registered in the app by id|Admin|-|Deleted Case|
|GET|**/cases/:caseId/tests** |Get a list of all Tests in a Case|Admin, Vet|-|List of Tests|
|PUT|**/cases/:caseId/tests** |Add a Treatment into a Case |Admin, Vet|testId|Updated Case|
|POST|**/cases/:caseId/tests** |Create a Test into a Case |Admin, Vet|**date**, **type**, description, results, observations, **vet**|Test created|
|DELETE|**/cases/:caseId/tests/:testId** |Delete a Test from a Case |Admin, Vet|-|List of Tests inside Case|
|POST|**/cases/:caseId/treatments** |Get the list of Treatments inside a Case by caseId |Admin, Vet|-|List of Treatments|
|PUT|**/cases/:caseId/treatments** |Add a Treatment in a Case |Admin, Vet|treatmentId|Updated Case|
|POST|**/cases/:caseId/treatments** |Create a Test into a Case |Admin, Vet|**startDate**, endDate, **type**, **description**, observation|Treatment created|
|DELETE|**/cases/:caseId/treatments/:treatmentId** |Delete a Treatment from a Case |Admin, Vet|-|List of Treatments inside Case|
##
- ### Notes

|Verb|Route|Description|Auth.|Body Params|Returns|Notes|
|-|-|-|-|-|-|-|
|GET|**/notes** |Get a list of all Notes|Admin|-|List with all Notes|
|GET|**/notes/:noteId** |Get a Note by Id|Admin, Vet, User|-|Note|_User must be author of the Note (except Admin)_|
|POST|**/notes** |Create a Note|Admin|**date**, **text**, **public**, **author**|Created Note|
|PUT|**/notes/:noteId** |Update a note|Admin, Vet, User|date, text, public|Updated Note|_User must be author of the Note (except Admin)_|
|DELETE|**/notes/:noteId** |Delete a Note by Id|Admin|-|Deleted Note|
##
- ### Pet

|Verb|Route|Description|Auth.|Body Params|Returns|Notes|
|-|-|-|-|-|-|-|
|GET|**/pets** |Get a list of all Pets|Admin, Vet|-|List with all Pets|
|GET|**/notes/noteId** |Get a Pet by Id|Admin, Vet, User|-|Pet|_Regular User must be owner of the Pet_|
|POST|**/pets**|Create a new Pet|Admin, Vet|**name**, **birthdate**, **species**, breed, **genre**, **alive**, description, alergies|Pet created|_notes_ and _record_ are ignored|
|PUT|**/pets/:petId**|Update a Pet by Id|Admin, Vet|name, birthdate, species, breed, genre, alive, description, alergies|Pet updated|_notes_ and _record_ are not allowed|
|DELETE|**/pets/:petId**|Delete a Pet by Id|Admin|-|Pet deleted|
|GET|**/pets/:petId/notes** |Get all public Notes and those wroten by current User|Admin, Vet, User|-|List of Notes|_Regular User must be owner of the Pet_|
|POST|**/pets/:petId/notes** |Create a Note into a Pet|Admin, Vet, User|**date**, **text**, **public**|Created Note|_Regular User must be owner of the Pet_|
|PUT|**/pets/:petId/notes/:noteId** |Add Note to Pet|Admin|noteId|List of Notes||
|DELETE|**/pets/:petId/notes/:noteId** |Delete a Note from a Pet|Admin, Vet, User|-|Notes inside Pet|_Regular User must be owner of the Pet_|
|GET|**/pets/:petId/cases** |Get all into a Pet|Admin, Vet, User|-|List of Cases|_Regular User must be owner of the Pet_|
|POST|**pets/:petId/cases** |Register a new Case into a Pet|Admin, Vet|**date**, observations, **purpose**, diet, habitat, tests, treatments, **vet**, vitalSigns|New Case
|PUT|**/pets/:petId/cases** |Add a Case to Pet profile|Admin, Vet|caseId|Updated Pet|
|GET|**/pets/:petId/tests** |Get all tests done to Pet|Admin, Vet, User|-|List of Tests|_Regular User must be owner of the Pet_|
|GET|**/pets/:petId/tests** |Get all Treatments of a Pet|Admin, Vet, User|-|List of Treatments|_Regular User must be owner of the Pet_|
|GET|**/pets/:petId/tests** |Get all VitalSigns of Pet|Admin, Vet, User|-|List of VitalSigns|_Regular User must be owner of the Pet_|

##
- ### Test

|Verb|Route|Description|Auth.|Body Params|Returns|Notes|
|-|-|-|-|-|-|-|
|GET|**/tests** |Get a list of all Tests|Admin, Vet|-|List with all Tests|
|GET|**/notes/:testId** |Get a Test by testId|Admin, Vet|-|Test|
|DELETE|**/notes/:testId** |Create a new Test |Admin, Vet|**date**, **type**, description, results, observations, **vet**|Created Test|
|PUT|**/notes/:testId** |Update a Test by testId|Admin, Vet|date, type, description, results, vet|Updated Test|
|DELETE|**/notes/:testId** |Delete a Test by testId|Admin|-|Deleted Test|

##
- ### Treatment

|Verb|Route|Description|Auth.|Body Params|Returns|Notes|
|-|-|-|-|-|-|-|
|GET|**/treatments** |Get a list of all Treatments|Admin, Vet|-|List with all Treatments|
|GET|**/treatments/:treatmentId** |Get a Treatment by Id|Admin, Vet|-|Treatment|
|POST|**/treatments** |Create a new Treatment |Admin, Vet|**startDate**, endDate, **type**, **description**, observation|Created Treatment|
|PUT|**/treatments/:treatmentId** |Update a Treatment by Id|Admin, Vet|startDate, endDate, type, description, observation|Updated Treatment|
|DELETE|**/treatments/:treatmentId** |Delete a Treatment by treatmentId|Admin|-|Deleted treatment|

##
- ### User

|Verb|Route|Description|Auth.|Body Params|Returns|Notes|
|-|-|-|-|-|-|-|
|GET|**/users** |Get a list of all Users|Admin, Vet|-|List with all Users|
|GET|**/users/:userId** |Get an User by userId|Admin, Vet|-|User|
|GET|**/users/profile** |User get own profile|Admin, Vet, User|-|User|
|POST|**/users**|Register a new User in the App|Admin, Vet|**username**, **email**, **password**, firstName, lastName, phone, mobile, address: { **direction**, **city**, state, country}|User created|- Endpoint ignores _pets_ and _role_<br>- _address_ is not required, but if it is filled, **_city_** and **_direction_** will be _required_|
|PUT|**/users/:userId**|Update an User by id|Admin, Vet|username, email, password, firstName, lastName, phone, mobile, address: { direction, city, state, country}|User updated|- _address_ is not required, but if it is filled, **_city_** and **_direction_** will be _required_
|PUT|**/users/update**|User updates own profile|Admin, Vet, User|username, email, password, firstName, lastName, phone, mobile, address: { direction, city, state, country}|User updated|- Endpoint does not update _pets_ or _role_<br>- _address_ is not required, but if it is filled, **_city_** and **_direction_** will be _required_
|Delete|**/users/:userId** |Delete an User by userId|Admin, Vet|-|Deleted User|
|POST|**/users/pets**|Register a new Pet into current User|User|**name**, **birthdate**, **species**, breed, **genre**, **alive**, description, alergies|Pet created|_notes_ and _record_ are not allowed|
|PUT|**/users/:userId/pets** |Add a Pet to User profile|Admin, Vet|petId|Updated User|
##

- ### List of Response Code Status
|Code|Meaning|
|-|-|
|200|Everything is Ok
|201|Resource created
|403|Hey, you don't have permissions to do that!
|404|The resource is not found
|409|There is a conflict with your request. To read the docs would be a great idea
|500|Our server is suffering. Something very bad has happened.


##

## Team
- **Daniel Jesús Brito Sosa** - _Web Developer and Graphic designer_ - [leynad1392](https://github.com/leynad1392)
- **María José Siverio Pestana** - _Cross-platform developer_ - [Arixka](https://github.com/Arixka)
- **Ehedei Hernández García** - _Cross-platform developer_ - [ehedei](https://github.com/ehedei)

## License
MIT License
