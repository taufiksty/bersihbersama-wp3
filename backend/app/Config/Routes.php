<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
// The Auto Routing (Legacy) is very dangerous. It is easy to create vulnerable apps
// where controller filters or CSRF protection are bypassed.
// If you don't want to define all routes, please use the Auto Routing (Improved).
// Set `$autoRoutesImproved` to true in `app/Config/Feature.php` and set the following to true.
$routes->setAutoRoute(false);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.


$routes->group('api/v1', function ($routes) {
    $routes->get('users/', 'UserController::index');
    $routes->post('users/', 'UserController::create');
    $routes->get('users/(:segment)', 'UserController::show/$1');
    $routes->post('users/update/(:segment)', 'UserController::update/$1');
    $routes->delete('users/(:segment)', 'UserController::delete/$1');
    
    $routes->get('auth/user', 'AuthController::authUser');
    $routes->post('auth/token', 'AuthController::login');

    $routes->get('events/', 'EventsController::index');
    $routes->post('events/', 'EventsController::create');
    $routes->get('events/(:segment)', 'EventsController::show/$1');
    $routes->post('events/update/(:segment)', 'EventsController::update/$1');
    $routes->delete('events/(:segment)', 'EventsController::delete/$1');
    $routes->get('events/checkUserInAnEvent/(:segment)/(:segment)', 'PartisipantEventController::checkUserInAnEvent/$1/$2');
    $routes->post('events/join/(:segment)', 'PartisipantEventController::joinEvent/$1');
    $routes->get('events/getEventsByUserJoined/(:segment)', 'PartisipantEventController::getEventsByUserJoined/$1');
    $routes->get('events/getCountPartisipant/(:segment)', 'PartisipantEventController::getCountPartisipantByEvent/$1');
    $routes->post('events/finish/(:segment)', 'StatusController::finishEvent/$1');

    $routes->get('reports/', 'ReportsController::index');
    $routes->post('reports/', 'ReportsController::create');
    $routes->get('reports/(:segment)', 'ReportsController::show/$1');
    $routes->post('reports/update/(:segment)', 'ReportsController::update/$1');
    $routes->delete('reports/(:segment)', 'ReportsController::delete/$1');

    $routes->get('blogs/', 'BlogsController::index');
    $routes->post('blogs/', 'BlogsController::create');
    $routes->get('blogs/(:segment)', 'BlogsController::show/$1');
    $routes->post('blogs/update/(:segment)', 'BlogsController::update/$1');
    $routes->delete('blogs/(:segment)', 'BlogsController::delete/$1');

    $routes->post('status/acceptReport/(:segment)', 'StatusController::acceptReport/$1');
    $routes->get('status/getEventDoneByDate', 'StatusController::getEventDoneByDate');
});

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (is_file(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
