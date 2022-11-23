const { Router } = require('express');

const { Product } = require('../controllers');

const router = Router();

/**
 * @swagger
 * tags:
 *  - name: Products
 *    description: Endpoints para la gestion de productos
 */

/**
 * @swagger
 * definitions:
 *  Product:
 *    properties:
 *      id:
 *        type: string
 *      name:
 *        type: string
 *      price:
 *        type: number
 *      quantityInStock:
 *        type: number
 *      description:
 *        type: string
 *      categories:
 *        type: aray
 *        items:
 *          type: string
 *      images:
 *        type: array
 *        items:
 *          type: string
 *      slug:
 *        type: string
 *  ProductCreateRequest:
 *    properties:
 *      name:
 *        type: string
 *        example: Laptop lenovo
 *      price:
 *        type: number
 *        example: 123.45
 *      quantityInStock:
 *        type: number
 *        example: 15
 *      description:
 *        type: string
 *        example: lorem ipsum dolor sit amet
 *      categories:
 *        type: aray
 *        items:
 *          type: string
 *        example: ['Laptop', 'Lenovo']
 *      images:
 *        type: array
 *        items:
 *          type: string
 *        example: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80']
 *  UpdateProductRequest:
 *    properties:
 *      name:
 *        type: string
 *        example: Laptop lenovo
 *      price:
 *        type: number
 *        example: 123.45
 *      quantityInStock:
 *        type: number
 *        example: 15
 *      description:
 *        type: string
 *        example: lorem ipsum dolor sit amet
 *      categories:
 *        type: aray
 *        items:
 *          type: string
 *        example: ['Laptop', 'Lenovo']
 *      images:
 *        type: array
 *        items:
 *          type: string
 *        example: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80']
 *
 */

/**
 * @swagger
 * /product:
 *  get:
 *    description: Endpoint para el listado de productos
 *    tags:
 *      - Products
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Listado de productos
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            $ref: '#/definitions/Product'
 *      500:
 *        description: Respuesta de error del listado de productos
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Error'
 *  post:
 *    description: Endpoint para la creacion de un producto
 *    tags:
 *      - Products
 *    produces:
 *      - application/json
 *    requestBody:
 *      description: Cuerpo de la peticion para la creacion del producto
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/definitions/ProductCreateRequest'
 *    responses:
 *      201:
 *        description: Respuesta de creacion de producto exitoso
 *        schema:
 *          type: object
 *          $ref: '#/definitions/ProductCreateResponse'
 *      400:
 *        description: Respuesta de error de creacion de producto
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Error'
 *      500:
 *        description: Respuesta de error de creacion de producto
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Error'
 */
router.route('/').get(Product.findAll).post(Product.create);

/**
 * @swagger
 * /product/{productId}:
 *  get:
 *    description: Endpoint para obtener la informacion de un producto
 *    tags:
 *      - Products
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: productId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Respuesta de consulta de producto exitoso
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Product'
 *      404:
 *        description: Respuesta de error la consulta de un producto
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Error'
 *      500:
 *        description: Respuesta de error la consulta de un producto
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Error'
 *  put:
 *    description: Endpoint para la actualizacion de un producto
 *    tags:
 *      - Products
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      description: Cuerpo de la peticion para la actualizacion de un producto
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/definitions/UpdateProductRequest'
 *    responses:
 *      200:
 *        description: Respuesta de actualizacion de usuario exitoso
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Product'
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
 *  delete:
 *    description: Endpoint para la eliminacion de un producto
 *    tags:
 *      - Products
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      204:
 *        description: Respuesta de eliminacion de producto exitoso
 *      40x:
 *        description: Respuesta de error la eliminacion de un producto
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Error'
 *      500:
 *        description: Respuesta de error la eliminacion de un producto
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Error'
 */
router
  .route('/:productId')
  .get(Product.findById)
  .put(Product.update)
  .delete(Product.deleteProduct);

module.exports = router;
