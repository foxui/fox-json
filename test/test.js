document.addEventListener('HTMLImportsLoaded', function() {
    var qf = document.getElementById('qunit-fixture');

    asyncTest( 'attribute json', function() {

        expect( 1 );

        qf.innerHTML = '<fox-json json=\'{"a":1,"b":[1,2,3]}\'></fox-json>';

        ok(qf.firstChild.json);

        start();

    });

    asyncTest( 'getValue method', function() {

        expect( 1 );

        qf.innerHTML = '<fox-json json=\'{"a":1,"b":[1,2,3]}\'></fox-json>';

        ok(qf.firstChild.getValue().b[1] === 2);

        start();

    });

    asyncTest( 'setValue method', function() {

        expect( 1 );

        qf.innerHTML = '<fox-json json=\'{"a":1,"b":[1,2,3]}\'></fox-json>';

        var obj = qf.firstChild.getValue();
        obj.b[1] = 5;

        qf.firstChild.setValue(obj);

        ok(qf.firstChild.getValue().b[1] === 5);

        start();

    });

    asyncTest( 'data-change event', function() {

        expect( 1 );

        qf.innerHTML = '<fox-json json=\'{"a":1,"b":[1,2,3]}\'></fox-json>';

        qf.firstChild.addEventListener('data-change', function(evt) {
            var newData = JSON.parse(evt.detail.newVal);

            ok(newData.b[1] === 5);

            // ok(JSON.parse(data).newVal.b[1] === 5);
            start();

        }, false);

        var obj = qf.firstChild.getValue();
        obj.b[1] = 5;

        qf.firstChild.setValue(obj);

    });

    asyncTest( 'data-change event bubble', function() {

        expect( 3 );

        qf.innerHTML = '<fox-json json=\'{"a":1,"b":[1,2,3]}\'></fox-json>';

        qf.addEventListener('data-change', function(evt) {
            var newData = JSON.parse(evt.detail.newVal);

            ok(newData.b[1] === 5);

            ok(evt.target !== qf);
            ok(evt.target === qf.firstChild);

            // ok(JSON.parse(data).newVal.b[1] === 5);
            start();

        }, false);

        var obj = qf.firstChild.getValue();
        obj.b[1] = 5;

        qf.firstChild.setValue(obj);

    });
}, false);
