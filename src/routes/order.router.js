const { Router } = require('express');

const { Order } = require('../controllers');
const { Auth } = require('../middleware');

const router = Router();

/**
 * @swagger
 * tags:
 *  - name: Orders
 *    description: Endpoints para la gestion de ordenes
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * definitions:
 *  OrderItem:
 *    properties:
 *      product:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          price:
 *            type: number
 *          description:
 *            type: string
 *          categories:
 *            type: aray
 *            items:
 *              type: string
 *          images:
 *            type: array
 *            items:
 *              type: string
 *          slug:
 *            type: string
 *      quantity:
 *        type: number
 *      prices:
 *        type: number
 *  Order:
 *    properties:
 *      id:
 *        type: string
 *      date:
 *        type: string
 *        format: date
 *      products:
 *        type: array
 *        items:
 *          schema:
 *            type: object
 *            $ref: '#/definitions/OrderItem'
 *      user:
 *        type: string
 *      total:
 *        type: number
 *  OrderItemCreate:
 *    properties:
 *      product:
 *        type: string
 *        example: <productId>
 *      quantity:
 *        type: number
 *  OrderCreateRequest:
 *    properties:
 *      date:
 *        type: string
 *        format: date
 *      products:
 *        type: array
 *        items:
 *          type: object
 *          $ref: '#/definitions/OrderItemCreate'
 */

/**
 * @swagger
 * /order:
 *  get:
 *    description: Endpoint para el listado de ordenes
 *    tags:
 *      - Orders
 *    produces:
 *      - application/json
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Listado de ordenes
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            $ref: '#/definitions/OrderCreateRequest'
 *      500:
 *        description: Respuesta de error de las ordenes
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Error'
 *  post:
 *    description: Endpoint para la creacion de una orden
 *    tags:
 *      - Orders
 *    produces:
 *      - application/json
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      description: Cuerpo de la peticion para la creacion de una orden
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/definitions/OrderCreateRequest'
 *    responses:
 *      201:
 *        description: Respuesta de creacion de orden exitosa
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Order'
 *      400:
 *        description: Respuesta de error de creacion de una orden
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Error'
 *      500:
 *        description: Respuesta de error de creacion de una orden
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Error'
 */
router
  .route('/')
  .get(Auth.isAuth, Order.findOrders)
  .post(Auth.isAuth, Order.create);

module.exports = router;
