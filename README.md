# JSON Command

JSON command line processing command toolkit

# IMPORTANT

you need node v0.2.0 or higher to run this program.

# Description

json processes standard input and parses json objects. json currently handles a few 
different standard input formats and provides a number of options tailored to 
inspecting and transforming the parsed json objects.

# Examples

    curl http://search.twitter.com/search.json?q=node.js

    curl http://search.twitter.com/search.json?q=node.js | json

    curl http://search.twitter.com/search.json?q=node.js | json -o results

    curl http://search.twitter.com/search.json?q=node.js | json -o results from_user metadata

    curl http://search.twitter.com/search.json?q=node.js | json -o results new_id=id

    curl http://search.twitter.com/search.json?q=node.js | .json -o results -C from_user from_user_id

    curl http://stream.twitter.com/1/statuses/sample.json -uAnyTwitterUser:Password 2> /dev/null | json -o user.name user.id

# Synopsis

    json [options] [fields]

# Options

    -u                    print ugly json output, each object on a single line

    -d                    print debugging output including exception messages

    -o object.path        specify the path to an array to be iterated on

    new.key=old_key       move old_key to new.key in output object

    -c "js conditional"   specify a conditional that determines whether an object is printed

    -C                    print the output fields as tab delimited columns in the order specified

    -e "js expression"    execute arbitrary js within the context of each object.

# Fields

any number of fields can be specified to be printed from each json object.
by default the structure of the original json object is maintained, however options
like -e and foo=bar allow for transforming object structure.

# Standard Input Formats

* line delimited json objects
* back to back json objects. 
    e.g. { obj1 : body }{ obj2 : body }
* file separated json objects. 
    e.g. cat files/* | json

# Order of operations

1. objects are parsed from stdin

2. any non-existing requested keys are instantiated

3. conditionals are checked against the object. the object is discarded if conditionals do not pass

4. key transforms are applied to the object

5. expressions are run against the object

6. the requested keys are pulled from the object and output

# Limitations

* all input is handled through standard in
* the current version is not particularly slow, but is NOT optimized for speed in any way

# Known Issues

This is alpha quality code, so use at your own risk.

# Thanks

This project respectfully uses code from and thanks the authors of:

* [node](http://github.com/ry/node) 



