# Tag-It

Options
-------

    field:          item[tags][],
    availableTags:  [],
    currentTags:    [],
    acceptSpace:    false

Usage
-----

### Javascript

    jQuery('#tags').tagit({
      field:"sample[tags][]",
      availableTags:['github','sex','nice','hardcore','very nice'],
      currentTags:['sex'],
      acceptSpace:true
    });

### Html

    <ul id="tags"></ul>

-

> Built with jQuery and jQueryUI.
>
> By Levy Carneiro Jr.
>
> Upgraded by Thiago Lagden
