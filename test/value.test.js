suite( 'muigui/useful-value', function() {
	test( '<static> value', function( done ) {
		var d = { one : { two : { three : true, four : [1, 2, 3, 4] } } };

		expect( value( d, 'one' ) ).to.eql( d.one );
		expect( value( d, 'one.two' ) ).to.eql( d.one.two );
		expect( value( d, 'one.two.three' ) ).to.eql( d.one.two.three );
		expect( value( d, 'one.two.four' ) ).to.eql( d.one.two.four );
		expect( value( d, 'one.two.four.2' ) ).to.eql( d.one.two.four[2] );
		expect( value( d, 'one.three.four.2' ) ).to.equal( undefined );
		expect( value( d, 'one.two.beep.7' ) ).to.equal( undefined );
		expect( value( d, 'one.two.four.7' ) ).to.equal( undefined );

		done();
	} );

	test( '<static> value.assign', function( done ) {
		var expected = { one : { two : { three : true, four : [1, 2, 3, 4] } } },
			returned = {};

		value.assign( returned, 'one', {} );
		value.assign( returned, 'one.two', {} );
		value.assign( returned, 'one.two.three', true );
		value.assign( returned, 'one.two.four', [1, 2, 3, 4] );

		expect( returned ).to.eql( expected );

		done();
	} );

	test( '<static> value.bless', function( done ) {
		var expected = { foo : { bar : 'hello' } };

		expect( value.bless( 'foo.bar' ) ).to.be.an( 'object' );

		expect( value.bless( 'foo.bar', expected ) ).to.equal( 'hello' );

		done();
	} );

	test( '<static> value.coerce', function( done ) {
		expect( value.coerce( 'false'     ) ).to.equal( false );
		expect( value.coerce( 'null'      ) ).to.equal( null );
		expect( value.coerce( 'true'      ) ).to.equal( true );
		expect( value.coerce( 'undefined' ) ).to.equal( undefined );
		expect( isNaN( value.coerce( 'NaN' ) ) ).to.equal( true );
		expect( value.coerce( '1' ) ).to.equal( 1 );
		expect( value.coerce( '12' ) ).to.equal( 12 );
		expect( value.coerce( '123' ) ).to.equal( 123 );
		expect( value.coerce( '123.4' ) ).to.equal( 123.4 );
		expect( value.coerce( '123.45' ) ).to.equal( 123.45 );
		expect( value.coerce( '123.456' ) ).to.equal( 123.456 );
		expect( value.coerce( '1e10' ) ).to.equal( 10000000000 );
		expect( value.coerce( '.0000000001e10' ) ).to.equal( 1 );

		done();
	} );
} );
