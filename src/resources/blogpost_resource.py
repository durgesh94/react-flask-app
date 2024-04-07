from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort
from flask_pymongo import PyMongo
from bson import ObjectId  # Import ObjectId from bson
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

from ..config.db import mongo

parser = reqparse.RequestParser()
parser.add_argument('title', type=str, required=True, help='Title is required')
parser.add_argument('content', type=str, required=True, help='Content is required')
parser.add_argument('user_id', type=str, required=True, help='User ID is required')

class BlogPostResource(Resource):
    @jwt_required()
    def get(self, post_id=None):
        try:
            if post_id:
                post = mongo.db.posts.find_one_or_404({'_id': ObjectId(post_id)})
                post['_id'] = str(post['_id'])
                post['user_id'] = str(post['user_id'])
                return post, 200
            else:
                posts = list(mongo.db.posts.find())
                for post in posts:
                    post['_id'] = str(post['_id'])
                    post['user_id'] = str(post['user_id'])
                return posts, 200
        except Exception as e:
            return {'message': 'Internal Server Error', 'error': str(e)}, 500

    @jwt_required()
    def post(self):
        args = parser.parse_args()
        # Check if the user exists
        user = mongo.db.users.find_one({'_id': ObjectId(args['user_id'])})
        if not user:
            return {'message': 'User not found'}, 404
        # Create a new blog post associated with the user
        args['user_id'] = ObjectId(args['user_id'])  # Convert user_id to ObjectId
        post_id = mongo.db.posts.insert_one(args).inserted_id
        return {'id': str(post_id)}, 201

    @jwt_required()
    def put(self, post_id):
        args = parser.parse_args()
        result = mongo.db.posts.update_one({'_id': ObjectId(post_id)}, {'$set': args})
        if result.modified_count == 1:
            return {'message': 'Post updated'}, 200
        else:
            return {'message': 'Post not found'}, 404

    @jwt_required()
    def delete(self, post_id):
        result = mongo.db.posts.delete_one({'_id': ObjectId(post_id)})
        if result.deleted_count == 1:
            return {'message': 'Post deleted'}, 200
        else:
            return {'message': 'Post not found'}, 404

class UserBlogPostResource(Resource):
    @jwt_required()
    def get(self, user_id):
        posts = list(mongo.db.posts.find({'user_id': ObjectId(user_id)}))
        for post in posts:
            post['_id'] = str(post['_id'])
            post['user_id'] = str(post['user_id'])
        return posts, 200