# VetAPI

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


- ### Case

|Verb|Route|Description|Auth.|Body Params|Returns|Notes|
|-|-|-|-|-|-|-|
|GET|**/cases** |Get a list of all Cases|Admin, Vet|-|List with all cases|
|GET|**/cases/:caseId** |Get a Case registered in the app by id|Admin, Vet, User|-|Case|- A regular User can only get Cases from her pets|
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

- ### Notes

|Verb|Route|Description|Auth.|Body Params|Returns|Notes|
|-|-|-|-|-|-|-|
|GET|**/notes** |Get a list of all Notes|Admin|-|List with all Notes|
|GET|**/notes/noteId** |Get a Note by Id|Admin, Vet, User|-|Note|**_\*Note must be owned by the User (except Admin)_**|
|POST|**/notes** |Create a Note|Admin|**date**, **text**, **public**, **author**|Created Note|
|PUT|**/notes/noteId** |Update a note|Admin, Vet, User|date, text, public|Updated Note|**_\*Note must be owned by the User (except Admin)_**|
|DELETE|**/notes/:noteId** |Delete a Note by Id|Admin|-|Deleted Note|

## 

## Team
- **Daniel Jesús Brito Sosa** - _Desarrollador Web y Diseñador gráfico_ - [leynad1392](https://github.com/leynad1392)
- **María José Siverio Pestana** - _Desarrolladora Web_ - [Arixka](https://github.com/Arixka)
- **Ehedei Hernández García** - _Desarrollador Multiplataforma_ - [ehedei](https://github.com/ehedei)

## License
MIT License
