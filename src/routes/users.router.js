const { Router } = require('express');

const { User } = require('../controllers');

const router = Router();

/**
 * @swagger
 * tags:
 *  - name: Users
 *    description: Endpoints para la gestion de usuarios
 */

/**
 * @swagger
 * definitions:
 *  User:
 *    id:
 *      type: string
 *    identification:
 *      type: object
 *      properties:
 *        type:
 *          type: string
 *          enum: [CC, CE, PPE]
 *          example: 'CC'
 *        id:
 *          type: string
 *          example: 100110000
 *    first_name:
 *      type: string
 *      example: Pepe
 *    last_name:
 *      type: string
 *      example: Perez
 *    email:
 *      type: string
 *      example: pepe@example.com
 *    password:
 *      type: string
 *      example: password123
 *    birthday:
 *      type: string
 *      format: date
 *      example: 4/21/1994, 7:00:00 PM
 *  Error:
 *    properties:
 *      statusCode:
 *        type: number
 *      error:
 *        type: string
 *      message:
 *        type: string
 *  LoginRequest:
 *    required:
 *      - email
 *      - password
 *    properties:
 *      email:
 *        type: string
 *        example: test@example.com
 *      password:
 *        type: string
 *        example: 123456
 *  LoginResponse:
 *    properties:
 *      token:
 *        type: string
 *      user:
 *        type: object
 *        $ref: '#/definitions/User'
 *  SignupRequest:
 *    properties:
 *      identification:
 *        type: object
 *        properties:
 *          type:
 *            type: string
 *            enum: [CC, CE, PPE]
 *            example: 'CC'
 *          id:
 *            type: string
 *            example: 100110000
 *      first_name:
 *        type: string
 *        example: Pepe
 *      last_name:
 *        type: string
 *        example: Perez
 *      email:
 *        type: string
 *        example: pepe@example.com
 *      password:
 *        type: string
 *        example: password123
 *      birthday:
 *        type: string
 *        format: date
 *        example: 4/21/1994, 7:00:00 PM
 *  SignupResponse:
 *    properties:
 *      token:
 *        type: string
 *      user:
 *        type: object
 *        $ref: '#/definitions/User'
 *  UpdateUserRequest:
 *    properties:
 *      first_name:
 *        type: string
 *        example: Pepe
 *      last_name:
 *        type: string
 *        example: Perez
 *      email:
 *        type: string
 *        example: pepe@example.com
 *      password:
 *        type: string
 *        example: password123
 *      birthday:
 *        type: string
 *        format: date
 *        example: 4/21/1994, 7:00:00 PM
 *  UpdateUserResponse:
 *    properties:
 *      user:
 *        type: object
 *        $ref: '#/definitions/User'
 */

/**
 * @swagger
 * /user/login:
 *  post:
 *    description: Endpoint para el inicio de sesion
 *    tags:
 *      - Users
 *    produces:
 *      - application/json
 *    requestBody:
 *      description: Cuerpo de la peticion para el inicio de sesion
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/definitions/LoginRequest'
 *    responses:
 *      200:
 *        description: Respuesta de inicio de sesion exitoso
 *        schema:
 *          type: object
 *          $ref: '#/definitions/LoginResponse'
 *      401:
 *        description: Respuesta de error del inicio de sesion
 *        schema:
 *          type: object
 *          $ref: '#/definitions/LoginResponse'
 *      500:
 *        description: Respuesta de error del inicio de sesion
 *        schema:
 *          type: object
 *          $ref: '#/definitions/LoginResponse'
 */
router.post('/login', User.login);

/**
 * @swagger
 * /user/signup:
 *  post:
 *    description: Endpoint para el registro de usuario
 *    tags:
 *      - Users
 *    produces:
 *      - application/json
 *    requestBody:
 *      description: Cuerpo de la peticion para el registro de usuario
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/definitions/SignupRequest'
 *    responses:
 *      201:
 *        description: Respuesta de registro de usuario exitoso
 *        schema:
 *          type: object
 *          $ref: '#/definitions/SignupResponse'
 *      400:
 *        description: Respuesta de error del registro de usuario
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Error'
 *      409:
 *        description: Respuesta de error del registro de usuario
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Error'
 *      500:
 *        description: Respuesta de error del registro de usuario
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Error'
 */
router.post('/signup', User.signup);

/**
 * @swagger
 * /user/{userId}:
 *  put:
 *    description: Endpoint para la actualizacion de datos de un usuario
 *    tags:
 *      - Users
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      description: Cuerpo de la peticion para la actualizacion de datos de un usuario
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/definitions/UpdateUserRequest'
 *    responses:
 *      200:
 *        description: Respuesta de actualizacion de usuario exitoso
 *        schema:
 *          type: object
 *          $ref: '#/definitions/UpdateUserResponse'
 *      400:
 *        description: Respuesta de error la actualizacion de datos de un usuario
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Error'
 *      500:
 *        description: Respuesta de error la actualizacion de datos de un usuario
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Error'
 */
router.put('/:userId', User.update);

module.exports = router;
