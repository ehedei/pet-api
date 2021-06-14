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

### Addresses
| Key          | Type       | Reference      | Required | Validation               |
| ------------ | ---------- | -------------- | -------- | ------------------------ |
| \_id         | ObjectId   |                | False    |                          |
| direction    | String     |                | True     |                          |
| city         | String     |                | True     |                          |
| state        | String     |                | False    |                          |
| country      | String     |                | False    |                          |

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

### VitalSigns
| Key           | Type       | Reference      | Required | Validation              |
| ------------- | ---------- | -------------- | -------- | ----------------------- |
| \_id          | ObjectId   |                | False    |                         |
| weight        | Number     |                | False    |                         |
| height        | Number     |                | False    |                         |
| temperature   | Number     |                | False    |                         |
| heartRate     | Number     |                | False    |                         |
| breathingRate | Number     |                | False    |                         |

### Notes
| Key           | Type       | Reference      | Required | Validation              |
| ------------- | ---------- | -------------- | -------- | ----------------------- |
| \_id          | ObjectId   |                | False    |                         |
| date          | Date       |                | True     |                         |
| author        | ObjectId   | Users          | True     |                         |
| public        | Boolean    |                | True     | Default: false          |
| text          | String     |                | True     |                         |

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

### Treatment
| Key           | Type       | Reference      | Required | Validation              |
| ------------- | ---------- | -------------- | -------- | ----------------------- |
| \_id          | ObjectId   |                | False    |                         |
| startDate     | Date       |                | True     |                         |
| endDate       | Date       |                | False    |                         |
| type          | String     |                | True     |                         |
| description   | String     |                | True     |                         |
| observations  | String     |                | False    |                         |

