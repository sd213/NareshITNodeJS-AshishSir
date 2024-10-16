## Redis use 


Redis > 6379
## To find all Keys

    KEYS *
## To set Key Value    
    
    set key value

    ex:-  set city delhi

## To get Key value

    get keyname
    ex:- get city

## To Delete Key 
    del keyname
    ex:- del city
## To Flush All Data

    FLUSHALL
## To set key value with expiry time

    set keyname value ex time(seconds| milliseconds)
    ex:- set city bhubaneswar ex 5
    ex:- set city delhi PX 5000
