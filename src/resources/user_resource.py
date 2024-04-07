# resources/user_resource.py
# 1. SignUp
# 2. SignIn 

from flask_restful import Resource, reqparse
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from bson import ObjectId

from ..config.db import mongo

user_parser = reqparse.RequestParser()
user_parser.add_argument('email', type=str, required=True, help='Email is required')
user_parser.add_argument('password', type=str, required=True, help='Password is required')

class SignupResource(Resource):
    def __init__(self):
        self.mongo = mongo
        self.bcrypt = Bcrypt()

    def post(self):
        args = user_parser.parse_args()
        email = args['email']
        password = args['password']

        # Check if the user already exists
        existing_user = self.mongo.db.users.find_one({'email': email})
        if existing_user:
            return {'message': 'User with this email already exists'}, 400

        # Hash the password
        hashed_password = self.bcrypt.generate_password_hash(password).decode('utf-8')

        # Create a new user document
        new_user = {'email': email, 'password': hashed_password}
        self.mongo.db.users.insert_one(new_user)
        return {'message': 'User signed up successfully'}, 201

class SigninResource(Resource):
    def __init__(self):
        self.mongo = mongo
        self.bcrypt = Bcrypt()

    def post(self):
        args = user_parser.parse_args()
        email = args['email']
        password = args['password']

        # Find the user by email
        user = self.mongo.db.users.find_one({'email': email})
        if not user or not self.bcrypt.check_password_hash(user['password'], password):
            return {'message': 'Invalid email or password', 'status': 'failed'}, 401

        # User authenticated, generate access token
        access_token = create_access_token(identity=str(user['_id']))
        return {'message': 'User sign in successfully.', 'status': 'success', 'token': access_token}, 200

class UserResource(Resource):
    def __init__(self):
        self.mongo = mongo
    
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        print(current_user_id)
        user = self.mongo.db.users.find_one_or_404({'_id': ObjectId(current_user_id)})
        print(user)
        if user:
            return {'_id': str(user['_id']), 'email': user['email']}, 200
        else:
            return {'message': 'User not found'}, 404