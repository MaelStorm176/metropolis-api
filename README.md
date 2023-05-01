# metropolis-api

Simple API to communicate with Metropolis Cinema's website.

[![npm version](https://badge.fury.io/js/metropolis-api.svg)](https://badge.fury.io/js/metropolis-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Summary

* [1. What does it do?](#1-what-does-it-do)
* [2. Installation](#2-installation)
    * [2.1 NPM](#21-npm)
    * [2.2 Yarn](#22-yarn)
* [3. Usage](#3-usage)
* [4. Example output](#4-example-output)


## 1. What does it do?

This package will scrap the Metropolis Cinema's website and return :
<li>The list of movies</li>
<li>One movie's details</li>


## 2. Installation

### 2.1 NPM

```shell
$ npm install metropolis-api
```

### 2.2 Yarn

```shell
$ yarn add metropolis-api
```

## 3. Usage

```javascript
import { getMovies } from 'metropolis-api'

const movies = await getMovies(); // Get the list of movies currently playing
console.log(movies);
```

## 4. Example output

```javascript
[
    {
        id: '383926',
        title: '10 jours encore sans maman',
        duration: 96,
        genres: [ 'Comédie' ],
        poster: 'https://fr.web.img5.acsta.net/r_110_0/pictures/23/01/18/12/02/4822931.jpg',
        restriction: ''
    },
    {
        id: '559572',
        title: 'Champion (Metropolitan Opera)',
        duration: 200,
        genres: [ 'Opera' ],
        poster: 'https://fr.web.img6.acsta.net/r_110_0/pictures/22/04/22/11/34/1590806.jpg',
        restriction: ''
    },
    {
        id: '572384',
        title: 'Contes de Printemps',
        duration: 47,
        genres: [ 'Animation', 'Famille' ],
        poster: 'https://fr.web.img6.acsta.net/r_110_0/pictures/22/12/22/12/25/2339378.jpg',
        restriction: ''
    }
]
```