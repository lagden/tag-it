# Tag-It

Options
-------

    itemName              : 'item',
    fieldName             : 'tags',
    availableTags         : [],
    setTags               : [],
    onTagAdded            : null,
    onTagRemoved          : null,
    onTagClicked          : null,
    tagSource             : null,
    removeConfirmation    : false,
    caseSensitive         : true,
    allowSpaces           : false,
    singleField           : false,
    singleFieldDelimiter  : ',',
    singleFieldNode       : null,
    tabIndex              : null

Usage
-----

### Javascript

    jQuery('#tags').tagit({
      fieldName:"uebbaa",
      availableTags:['github','sex','nice','hardcore','very nice'],
      setTags:['sex','github'],
      allowSpaces:true
    });

### Html

    <ul id="tags"></ul>

-

Built with jQuery and jQueryUI.
Originally created by Levy Carneiro Jr.
Modified by Alex Ehlke.
Upgraded by Thiago Lagden.
