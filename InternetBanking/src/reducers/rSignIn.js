import * as type from '../constants'
// import Config from '../../config/config'
let defaultState = {}
const SignIn = (state = defaultState, action) => {
    switch (action.type) {
        case type.SIGNIN:
            return {
                ...state,
                token: action.payload
            };
        case type.GET_PROFILE:
            return {
                ...state,
                // user: action.payload
                user: {
                    "status": "success",
                    "data": {
                        "id": 1,
                        "name": "Admin",
                        "email": "admin@gmail.com",
                        "email_verified_at": null,
                        "created_at": null,
                        "updated_at": null,
                        "type": 1,
                        "role": {
                            "student": true,
                            "teacher": true,
                            "score": true,
                            "event_school": true,
                            "budget": true,
                            "schedule": true,
                            "subject": true,
                            "class": true
                        }
                    }
                }
            };
        default:
            return {
                ...state,
            }
    }
}
export default SignIn