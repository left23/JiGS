/**
 * Created by techbot on 17/11/14.
 */
playState[1] = {
    init: function() {
        //Called as soon as we enter this state

    },
    preload: function() {

        var number = paddy(grid,3);
        game.load.tilemap('world', '/components/com_battle/views/phaser/tmpl/grid' + number + '.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.spritesheet('ms', '/components/com_battle/images/assets/metalslug_mummy37x45.png', 37, 45, 18);

        //load tiles
        for	(var index = 0; index < tile_names[grid].length; index++) {
            var filename = tile_names[grid][index];
            game.load.image(filename, '/components/com_battle/images/assets/tiles/' + filename +'.png');
        }

        //////////////////////// monsters
        if (typeof assets_name[grid] != 'undefined') {

            //load assets
            for (var index = 0; index < assets_name[grid].length; index++) {
                var filename = assets_name[grid][index];
                game.load.spritesheet(filename, '/components/com_battle/images/assets/' + filename + '.png', 70, 60, 8);
            }
        }

        /////////////////////////////
        if(players_list.length != 0) {
///////////////////// load players
            for (var index = 0; index < players_list.length; index++) {
                var filename = players_list[index].avatar;

                if (filename==null){
                    filename= 'gallery/skater.gif';
                }
                var key = players_list[index].id;
                console.log("filename : " + filename);
                 if (filename.substring(0,7)!= 'gallery') {
                    game.load.image(key, '/images/comprofiler/tn' + filename);
                }else
                {
                    game.load.image(key, '/images/comprofiler/' + filename);
                }
            }
        }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

               if(buildings.length != 0) {
///////////////////// load buildings
            for (var index = 0; index < buildings.length; index++) {
                var filename = buildings[index].image;
                var key = buildings[index].id;
              //  console.log("filename : " + filename);
                game.load.image("_" + key, '/components/com_battle/images/buildings/' + filename);
// game.load.spritesheet('bank', '/components/com_battle/images/buildings/bank.jpg', 48, 48, 1);
            }
        }

        if(npc_list.length != 0) {
///////////////////// load chars
            for (var index = 0; index < npc_list.length; index++) {
                var filename = npc_list[index].avatar;
                var key = npc_list[index].name;
            //    console.log("key : " + key);
               // console.log("filename : " + filename);
                game.load.image(key, '/components/com_battle/images/ennemis/miniatures/' + filename);
// game.load.spritesheet('bank', '/components/com_battle/images/buildings/bank.jpg', 48, 48, 1);
            }
        }

        if (avatar.substring(0,7)!='gallery') {
            game.load.image('arrow', '/images/comprofiler/tn' + avatar);

        }else
        {
            game.load.image('arrow', '/images/comprofiler/' + avatar);
        }
        game.load.spritesheet('portal00001', '/components/com_battle/images/assets/tiles/portals_1.png', 64, 64, 1);
        game.load.spritesheet('portal00002', '/components/com_battle/images/assets/tiles/portals_2.png', 64, 64, 1);
        game.load.spritesheet('portal00003', '/components/com_battle/images/assets/tiles/portals_3.png', 64, 64, 1);

    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.plugin(Phaser.Plugin.Tiled);
        //  Modify the world and camera bounds
        game.world.setBounds(boundsX1[grid], boundsY1[grid], boundsX2[grid], boundsY2[grid]);

        game.stage.backgroundColor = '#787878';

        //game.input.onDown.add(doSomething, this);

        var cacheKey = Phaser.Plugin.Tiled.utils.cacheKey;

        /////////////////// cache json file
        game.load.tiledmap(cacheKey('world', 'tiledmap'), 'grid' + grid + '.json', null, Phaser.Tilemap.TILED_JSON);

        ///////////////////// cache tiles
        for (var index = 0; index < tile_names[grid].length; index++) {
            var filename = tile_names[grid][index];
            game.load.image(cacheKey(filename, 'tileset', filename), '/components/com_battle/images/assets/tiles/' + filename + '.png');
        }

/////////////////// cache monsters
        if (typeof assets_name[grid] != 'undefined') {
            ///////////////////// cache assets
            for (var index = 0; index < assets_name[grid].length; index++) {
                var filename = assets_name[grid][index];
                game.load.spritesheet(cacheKey(filename, 'tileset', filename), '/components/com_battle/images/assets/' + filename + '.png', 70, 120, 8);
            }
        }

        //////////////////// cache players
        for (var index = 0; index < players_list.length; index++) {
            var filename =players_list[index].avatar;

            if (filename==null){
                filename= 'gallery/skater.gif';
            }

            var key = players_list[index].id;

            if (filename.substring(0,7)!= 'gallery') {
                game.load.image(cacheKey(key, 'tileset', key), '/images/comprofiler/tn' + filename );

            }else
            {
                game.load.image(cacheKey(key, 'tileset', key), '/images/comprofiler/' + filename );

            }
        }
        //////////////////// cache buildings
        for (var index = 0; index < buildings.length; index++) {
            //var filename = buildings[index].image;
            var key = buildings[index].id;
            //game.load.image(filename, '/components/com_battle/images/buildings/' + filename +'.jpg');
            // game.load.spritesheet('bank', '/components/com_battle/images/buildings/bank.jpg', 48, 48, 1);
            game.load.image(cacheKey("_" + key, 'tileset', "_" + key), '/components/com_battle/images/buildings/' + filename );
        }

        //////////////////// cache chars
        for (var index = 0; index < npc_list.length; index++) {


            var filename = npc_list[index].avatar;
            var key = npc_list[index].id;
            //game.load.image(key, '/components/com_battle/images/ennemis/miniatures/' + filename );
            // game.load.spritesheet('bank', '/components/com_battle/images/buildings/bank.jpg', 48, 48, 1);
            game.load.image(cacheKey(key, 'tileset', key), '/components/com_battle/images/ennemis/miniatures/' + filename );
        }
        //////////////////// cache Portals
        game.load.image(cacheKey('portal00001', 'tileset', 'portal00001'), '/components/com_battle/images/assets/tiles/Dungeon_A1.png');
        game.load.image(cacheKey('portal00002', 'tileset', 'portal00002'), '/components/com_battle/images/assets/tiles/Dungeon_B.png');
        game.load.image(cacheKey('portal00003', 'tileset', 'portal00003'), '/components/com_battle/images/assets/tiles/Dungeon_C.png');

        // if you have image layers, be sure to load those too! Again,
        // make sure the last param is the name of your layer in the map.
        game.load.image(cacheKey('grid001optimised', 'layer', 'grid001optimised'), 'grid001optimised.png');
        cursors = game.input.keyboard.createCursorKeys();
        game.input.onDown.add(moveBall, this);

        addMap();
        for (var index = 0; index < tile_names[grid].length; index++) {
            var filename = tile_names[grid][index];
            map.addTilesetImage(filename, filename);
        }
/////////////////////////////////////////////////////////////////////
        map.setCollisionBetween(0, 9000,true,'obstacles');
////////////////////////////////////Add Player /////////////////////////////////
        sprite = game.add.sprite(parseInt(new_x),parseInt(new_y), 'arrow');
        game.physics.enable(sprite, Phaser.Physics.ARCADE);
        sprite.body.enable =true;
        sprite.body.allowRotation = false;
        this.camera.follow(sprite, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
/////////////////////////////////////////////place buildings//////

        if(buildings.length != 0) {
            for (var index = 0; index < buildings.length; index++) {
                var key = buildings[index].id;
                //console.log("_" + key);
                add_building[index] = game.add.sprite(buildings[index].posx * 1, buildings[index].posy * 1, "_" + key);
                add_building[index].id = key;
                game.physics.enable(add_building[index], Phaser.Physics.ARCADE);
                add_building[index].body.velocity = 0;
            }
        }
////////////////////////place assets//////
        if (typeof assets_name[grid] != 'undefined') {
            for (var index = 0; index < assets_name[grid].length; index++)
            {
                var key = assets_name[grid][index];

                add_assets[index] = game.add.sprite(assets_name_x[grid][index], assets_name_y[grid][index], key);

                add_assets[index].animations.add('walk');

                add_assets[index].animations.play('walk',8,true);

                add_assets[index].id = key;
               // game.physics.enable(add_building[index], Phaser.Physics.ARCADE);
            }
        }
        ////////////////////////place players//////
        players_group  = game.add.group();
        if (typeof players_list != 'undefined') {
            for (var index = 0; index < players_list.length; index++) {

                var key = players_list[index].id

               //add_players[index] = game.add.sprite(players_list[index].posx, players_list[index].posy, key);
                players_group.create(players_list[index].posx, players_list[index].posy,  key);

            }
          game.physics.enable( players_group, Phaser.Physics.ARCADE);
        }


/////////////////////////////////////////////////////////////////
        if(npc_list.length !=0 ) {
            /////////////////////////////////////////////place chars//////
            for (var index = 0; index < npc_list.length; index++) {
                var key = npc_list[index].name;
                var key_id = npc_list[index].id;
                //console.log(key);
                add_npc[index] = game.add.sprite(parseInt(npc_list[index].posx) ,parseInt( npc_list[index].posy) , key);
                add_npc[index].id = key;
                add_npc[index].key_id = key_id;

                game.physics.enable(add_npc[index], Phaser.Physics.ARCADE);
                add_npc[index].body.velocity = 0;
            }
        }
/////////////////////////////////////////////////////////////////
        portal[1] = game.add.sprite(x1[grid],y1[grid], 'portal00001');
        portal[1]['dest']=portal_dest_1[grid];
        game.physics.enable(portal[1], Phaser.Physics.ARCADE);
        portal[2] = game.add.sprite(x2[grid], y2[grid], 'portal00002');
        game.physics.enable(portal[2], Phaser.Physics.ARCADE);
        portal[2]['dest']=portal_dest_2[grid];
        portal[3] = game.add.sprite(x3[grid], y3[grid], 'portal00003');
        game.physics.enable(portal[3], Phaser.Physics.ARCADE);
        portal[3]['dest']=portal_dest_3[grid];
        // game.add.tween(monster1).to({ x: 10 }, 10000, Phaser.Easing.Linear.None, true);
        mummy = game.add.sprite(400, 300, 'ms');
        mummy.animations.add('walk');
        mummy.animations.play('walk', 50, true);

      //  game.add.tween(mummy).to({ x: game.width }, 10000, Phaser.Easing.Linear.None, true);
///////////////////////////////////////////
    },
    update: function() {
/////////////////////////////////////////////////////////////////
       this.physics.arcade.collide(sprite, layer);
        //this.physics.arcade.collide(sprite2, layer);
/////////////////////////////////////////////////////////////////

        this.physics.arcade.collide(sprite, portal[1],jump);
        this.physics.arcade.collide(sprite, portal[2],jump);
        this.physics.arcade.collide(sprite, portal[3],jump);

///////////////////////collide buildings////////////////////////

        for (var index = 0; index < buildings.length; index++)
        {
            //console.log(key);
            this.physics.arcade.collide(sprite, add_building[index], enter_building);

        }
        game.physics.arcade.moveToXY(sprite, x, y, 100);

///////////////////////collide npc list////////////////////////

        for (var index = 0; index < npc_list.length; index++)
        {
            //console.log(key);
            this.physics.arcade.collide(sprite, add_npc[index], npc);
            //add_building[index].body.immovable = true;
        }

/////////////////////collide players ///////////////////////////////////////////
        for (var index = 0; index < players_list.length; index++)
        {
            //console.log(key);
            this.physics.arcade.collide(sprite, add_players[index], player);
            //add_building[index].body.immovable = true;
        }

////////////////////////////////////////////////////////////////

        if ((sprite.body.x >=x-10) &&(sprite.body.x <=x+10)){
            sprite.body.velocity.x = 0;
            //console.log('x:' +sprite.body.velocity.x);
        }
        if ((sprite.body.y >=y-10) &&(sprite.body.y <=y+10)){
            sprite.body.velocity.y = 0;
            //console.log('y:' + sprite.body.velocity.y);
        }

        if ((sprite.body.velocity.x == 0)&&(sprite.body.velocity.y == 0)) {

            if (send == 1) {

                doSomething();
                send = 0;
            }
        }

////////////////////////////////////////////////////////////////

        if (cursors.up.isDown) {
            game.camera.y -= 4;
        }
        else if (cursors.down.isDown) {
            game.camera.y += 4;
        }
        if (cursors.left.isDown) {
            game.camera.x -= 4;
        }
        else if (cursors.right.isDown) {
            game.camera.x += 4;
        }
        //if (sprite2.x >= 300) {
        //}
    },
    render: function() {
           game.debug.spriteCoords(sprite, 32, 32);
// game.debug.cameraInfo(game.camera, 96, 64);
    }
};
