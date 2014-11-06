angular.module('starter.services', [])
    .factory('API', function ($rootScope, $http, $ionicLoading, $window, $timeout)
    {
        var base = "http://groupmwt.com/garzablanca/DBOff/Angular/ajax/";

        $rootScope.show = function (text)
        {
            $rootScope.loading = $ionicLoading.show(
                {
                    content: text ? text : '<i class="ion-loading-a" style="font-size: 30px;"></i><br><br> <p>Loading...</p>',
                    template: text,
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 600,
                    showDelay: 0
                });
        };

        $rootScope.hide = function () {
            $ionicLoading.hide();
        };

        $rootScope.logout = function () {
            $rootScope.DesactiveDriver();
            $rootScope.setToken("","","","","","","","","","","");
            $('#d_edit').css('display','none');
            $('#d_logout').css('display','none');
            $('#d_active').css('display','none');
            $('#d_inactive').css('display','none');
            $('#btn_footer').css('display','none');
            if($rootScope.socketCreated != 1){
                $rootScope.init_socket();
            }
            $window.location.href = '#/sign-in';
        };

        $rootScope.notify = function(text ){
            $rootScope.show(text);
            $window.setTimeout(function () {
                $rootScope.hide();
            }, 2000);
        };

        $rootScope.doRefresh = function (tab) {
            if(tab == 1)
                $rootScope.$broadcast('fetchAll');
            else
                $rootScope.$broadcast('fetchCompleted');

            $rootScope.$broadcast('scroll.refreshComplete');
        };

        $rootScope.setToken = function (fname, lname, token, phone, utype, uid, cmodel, cmaker, cyear, cboard, cnum) {
            $window.localStorage.dname = fname+" "+lname;
            $window.localStorage.dfname = fname;
            $window.localStorage.dlname = lname;
            $window.localStorage.dphone = phone;
            $window.localStorage.dtype = utype;
            $window.localStorage.did = uid;
            $window.localStorage.dmodel = cmodel;
            $window.localStorage.dmaker = cmaker;
            $window.localStorage.dyear = cyear;
            $window.localStorage.dboard = cboard;
            $window.localStorage.dnum = cnum;

            return $window.localStorage.dtoken = token;
        };

        $rootScope.updateToken = function (fname, lname, token, phone, utype, cmodel, cmaker, cyear, cboard, cnum) {
            $window.localStorage.dname = fname+" "+lname;
            $window.localStorage.dfname = fname;
            $window.localStorage.dlname = lname;
            $window.localStorage.dphone = phone;
            $window.localStorage.dtype = utype;
            $window.localStorage.dmodel = cmodel;
            $window.localStorage.dmaker = cmaker;
            $window.localStorage.dyear = cyear;
            $window.localStorage.dboard = cboard;
            $window.localStorage.dnum = cnum;

            return $window.localStorage.dtoken = token;
        };

        $rootScope.ActiveDriver = function () {
            //Boton Activar
            $('#btn_active_y').css('display','block');
            $('#btn_active_n').css('display','none');

            //Boton Desactivar
            $('#btn_inactive_n').css('display','block');
            $('#btn_inactive_y').css('display','none');

            // Logos Activo - Inactivo
            $('#d_active').css('display','block');
            $('#d_inactive').css('display','none');

            // Edit Data Base Driver Status
            var D_Id  = $window.localStorage.did;
            var D_Status = 1;

            //console.log('D_Id:', D_Id);
            //console.log('D_Status:', D_Status);

            $rootScope.startGeolocation();

            return $http.post(base+"editDriverStatus.php?DId="+D_Id+"&DStatus="+D_Status);
        };

        $rootScope.startGeolocation =  function () {

            $rootScope.geo_watch = navigator.geolocation.watchPosition(
                function(new_position){
                    var send_info = [];
                    send_info.push({"uid" : $rootScope.getUId() ,"lat" : new_position.coords.latitude , "long" : new_position.coords.longitude});

                    //console.log("Geolocation:",send_info);

                    $http.post(base+"addDriverGL.php?loc="+JSON.stringify(send_info));
                }, function(){
                    console.log('some geo watch error');
                },{
                    maximumAge : 300,
                    timeout : 3000,
                    enableHighAccuracy : true
                }
            );
        };
        //shows alert on client app
        $rootScope.alertClient= function () {
            $rootScope.socket.emit('alert_client', {'clientId':$rootScope.currentClient , 'cabNumber' : $rootScope.getCnum()});

            $('#atertClientBtn').toggleClass('button-outline').unbind('touchstart');

            $timeout(function() {
                $('#atertClientBtn').toggleClass('button-outline').bind('touchstart',$rootScope.alertClient);
            }, 10000);

        };

        $rootScope.DesactiveDriver = function () {
            //Boton Activar
            $('#btn_active_y').css('display','none');
            $('#btn_active_n').css('display','block');

            //Boton Desactivar
            $('#btn_inactive_n').css('display','none');
            $('#btn_inactive_y').css('display','block');

            // Logos Activo - Inactivo
            $('#d_active').css('display','none');
            $('#d_inactive').css('display','block');

            // Edit Data Base Driver Status
            var D_Id  = $window.localStorage.did;
            var D_Status = 0;

            //console.log('D_Id:', D_Id);
            //console.log('D_Status:', D_Status);
            $rootScope.stopGeolocation();
            return $http.post(base+"editDriverStatus.php?DId="+D_Id+"&DStatus="+D_Status);
        };

        $rootScope.stopGeolocation =  function () {
            navigator.geolocation.clearWatch($rootScope.geo_watch);
        };

        $rootScope.hideDriver = function(){
            return $http.post(base+"editDriverStatus.php?DId="+$rootScope.getUId()+"&DStatus=0");
        };

        $rootScope.getToken = function () {
            return $window.localStorage.dtoken;
        };

        $rootScope.getUName = function () {
            return $window.localStorage.dname;
        };

        $rootScope.getUFName = function () {
            return $window.localStorage.dfname;
        };

        $rootScope.getULName = function () {
            return $window.localStorage.dlname;
        };

        $rootScope.getUphone = function () {
            return $window.localStorage.dphone;
        };

        $rootScope.getUType = function () {
            return $window.localStorage.dtype;
        };

        $rootScope.getUId = function () {
            return $window.localStorage.did;
        };

        $rootScope.getCmodel = function () {
            return $window.localStorage.dmodel;
        };

        $rootScope.getCmaker = function () {
            return $window.localStorage.dmaker;
        };

        $rootScope.getCyear = function () {
            return $window.localStorage.dyear;
        };

        $rootScope.getCboard = function () {
            return $window.localStorage.dboard;
        };

        $rootScope.getCnum = function () {
            return $window.localStorage.dnum;
        };

        $rootScope.isSessionActive = function () {
            return $window.localStorage.dtoken ? true : false;
        };

        $rootScope.isDriverActive = function () {
            var D_Id  = $window.localStorage.did;
            return $http.post(base+"getDriverStatus.php?DId="+D_Id);
        };

        return {
            signin: function (form) {

                var NUEm  = form.email;
                var NUPw1 = form.password;
                var NUPw2 = calcMD5(NUPw1);

                //console.log('NUEm:', NUEm);
                //console.log('NUPw1:', NUPw1);
                //console.log('NUPw2:', NUPw2);

                return $http.post(base+"getUser.php?NUEm="+NUEm+"&NUPw="+NUPw2+"&NUTp="+1);
            },
            signup: function (form) {

                var SUFName = form.fname;
                var SULName = form.lname;
                var SUEmail = form.email;
                var SUPhone = form.phone;
                var SUPassw = calcMD5(form.pass1);
                var SUModel = form.model;
                var SUMaker = form.maker;
                var SUCyear = form.cyear;
                var SUBoard = form.board;
                var SUCnumb = form.cnumb;

                //console.log('SUFName:', SUFName);
                //console.log('SULName:', SULName);
                //console.log('SUEmail:', SUEmail);
                //console.log('SUPhone:', SUPhone);
                //console.log('SUPassw:', SUPassw);

                return $http.post(base+"addUser.php?NUFN="+SUFName+"&NULN="+SULName+"&NUEm="+SUEmail+"&NUPh="+SUPhone+"&NUPw="+SUPassw+"&NUTp="+1+"&NUModel="+SUModel+"&NUMaker="+SUMaker+"&NUYear="+SUCyear+"&NUBoard="+SUBoard+"&NUNumber="+SUCnumb);
            },
            edit_pass: function (form) {

                var U_Id  = form.u_id;
                var U_New_Pass = calcMD5(form.U_new_pass);
                var U_Old_Pass = calcMD5(form.u_old_pass);

                //console.log('Change Pass Form (Services.js):', form);
                //console.log('Old Password Encrypted Change Pass Form (Services.js):', U_Old_Pass);
                //console.log('New Password Encrypted Change Pass Form (Services.js):', U_New_Pass);

                return $http.post(base+"editPass.php?UId="+U_Id+"&UOP="+U_Old_Pass+"&UNP="+U_New_Pass+"&UTp="+1);
            },
            recover_pass: function (form) {

                var U_Email  = form.u_email;
                var U_Pass = form.u_pass;
                var U_Pass_Enc = calcMD5(form.u_pass_enc);

                //console.log('Recover Pass Form (Services.js):', form);

                return $http.post(base+"recoverPass.php?UEm="+U_Email+"&URPE="+U_Pass_Enc+"&URP="+U_Pass+"&UTp="+1);
            },
            driverstatus: function (dstatus) {

                var D_Id  = getUId();
                var D_Status = dstatus;

                console.log('D_Id:', D_Id);
                console.log('D_Status:', D_Status);

                return $http.post(base+"editDriverStatus.php?DId="+D_Id+"&DStatus="+D_Status);
            },
            edit_driver: function (form) {

                var D_Id  = form.d_id;
                var SUFname = form.fname;
                var SULname = form.lname;
                var SUEmail = form.email;
                var SUPhone = form.phone;
                var SUModel = form.model;
                var SUMaker = form.maker;
                var SUCyear = form.cyear;
                var SUBoard = form.board;
                var SUCnumb = form.cnumb;

                console.log('Efit Form:', form);

                return $http.post(base+"editDriver.php?DId="+D_Id+"&DFN="+SUFname+"&DLN="+SULname+"&DEm="+SUEmail+"&DPh="+SUPhone+"&DTp="+1+"&DModel="+SUModel+"&DMaker="+SUMaker+"&DYear="+SUCyear+"&DBoard="+SUBoard+"&DNumber="+SUCnumb);
            },
            delete_user: function (form) {

                var U_Id  = form.u_id;

                //console.log('Delete ID (Services.js):', U_Id);

                return $http.post(base+"deleteUser.php?UId="+U_Id);
            }
        }
    });
