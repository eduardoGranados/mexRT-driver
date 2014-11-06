angular.module('starter.controllers', ['starter.services'])

//***************************************************************************************************************************
// SignIn Controller
//***************************************************************************************************************************
.controller('SignInCtrl', function ($rootScope, $scope, API, $window)
{


    $rootScope.init_socket = function() {
        var info = [];
        $rootScope.socketCreated = 1;
        $rootScope.socket = io.connect('http://206.190.152.224:3001', {'transports': [ 'polling', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']});

        $rootScope.socket.on('connect', function() {
            info.push($rootScope.getUId());
            info.push('cab');
            $rootScope.socket.emit('new_client', info);

            info= [];
        });
        //$rootScope.socket.on('disconnect', function() {
        //    //alert('An unknown error has occurred, please restart the app');
        //    //$rootScope.closeNewTask();
        //});

        $rootScope.socket.on('new_request', function(msg) {
            //console.log(msg);
            $rootScope.showConfirm(msg);
            window.plugin.notification.local.add({
                id:      1,
                title:   'Taxi Request',
                message: 'New client requesting a taxi'
            });
        });
    };

    //Token Password: "7z%*-+W-"
    $('#d_back').css('display','none');
    // Se Realiza el Check para Validar si el Usuario ya esta Logeado...
    if ($rootScope.isSessionActive()) {
        console.log('Session Iniciada');
        $window.location.href = ('#/home');
        if($rootScope.socketCreated != 1){
            $rootScope.init_socket();
        }

        //if($rootScope.socketCreated == 1){
        //
        //    $rootScope.socket.io.reconnect();
        //}else{
        //    $rootScope.init_socket();
        //}
    }

    // limpiamos las Variables Email y Password con las que Vamos a Trabajar
    $scope.user = {
        email: "",
        password: ""
    };

    // Validamos los Datos del Usuario
    $scope.validateUser = function ()
    {
        var email = this.user.email;
        var password = this.user.password;

        if(!email || !password)
        {
            $rootScope.notify('<i class="ion-alert-circled" style="font-size: 30px;"></i><br><br><p>Please fill in all the required fields...</p>');
            return false;
        }

        $rootScope.show('<i class="ion-loading-a" style="font-size: 30px;"></i><br><br><p>Please wait...</p>');

        API.signin({
            email: email,
            password: calcMD5(password+"ZrX@s5AF*7zu")
        })
        .success(function (data)
        {
            // Datos del Usuario Retornados desde El Servidor
            // console.log('Data in Controller Signin:', data);

            if(!data)
            {
                $rootScope.notify('<i class="ion-alert-circled" style="font-size: 30px;"></i><br><br><p>1.- 1.- Wrong information.<br>2.- Unverified account.</p>');
                return false;
            }
    
            // Creamos la Sesion
            $rootScope.setToken(data[0].first_name, data[0].last_name, data[0].email, data[0].phone, data[0].type, data[0].id, data[0].model, data[0].factory, data[0].year, data[0].placa, data[0].cabnumber);

            // Ocultamos el Aviso de Conectando y redireccionamos a la Pagina de Inicio
            $rootScope.hide();
            $('#d_edit').css('display','block');
            $('#d_logout').css('display','block');
            $('#d_active').css('display','block');
            $('#d_inactive').css('display','none');
            $('#btn_footer').css('display','block');
            $rootScope.DesactiveDriver();
            $window.location.href = ('#/home');

            if($rootScope.socketCreated != 1){
                $rootScope.init_socket();
            }

            //$rootScope.init_socket();
        })
        .error(function (error)
        {
            $rootScope.hide();
            $rootScope.notify('<i class="ion-alert-circled" style="font-size: 30px;"></i><br><br><p>Wrong information, please try again.</p>');
        });
    }
})

//***************************************************************************************************************************
// Password Controller
//***************************************************************************************************************************
.controller('PassCtrl', function ($rootScope, $scope, API, $window, $state)
{
    $('#d_back').css('display','block');

    $scope.dpass = {
        old_pwd: "",
        password1:"",
        password2:""
    };

    $scope.goState = function (state) {
            $state.go(state);
        };

    $scope.Editpassword = function ()
    {
        var usr_old_pass  = this.dpass.old_pwd;
        var usr_new_pass1 = this.dpass.password1;
        var usr_new_pass2 = this.dpass.password2;
        var usr_id = $rootScope.getUId();

        if(!usr_old_pass || !usr_new_pass1 || !usr_new_pass2)
        {
            $rootScope.notify('<i class="ion-alert-circled" style="font-size: 30px;"></i><br><br><p>Please fill in all the required fields. (*)</p>');
            return false;
        }
        
        if(usr_new_pass1 != usr_new_pass2)
        {
            $rootScope.notify('<i class="ion-alert-circled" style="font-size: 30px;"></i><br><br><p>Passwords must match</p>');
            return false;
        }

        $rootScope.show('<i class="ion-loading-a" style="font-size: 30px;"></i><br><br><p>Updating your information...</p>');

        API.edit_pass({
            u_id: usr_id,
            u_old_pass: calcMD5(usr_old_pass+"ZrX@s5AF*7zu"),
            U_new_pass: calcMD5(usr_new_pass1+"ZrX@s5AF*7zu") 
        })
        .success(function (data)
        {
            //console.log('Data in Controller Edit Password:', data);

            if(data == 0)
            {
                $rootScope.notify('<i class="ion-alert-circled" style="font-size: 30px;"></i><br><br><p>Incorrect password...</p>');
                return false;
            }
            else
            {
                // Ocultamos el Aviso de Conectando y redireccionamos a la Pagina de Inicio
                $rootScope.hide();

                $rootScope.notify('<i class="ion-checkmark-circled" style="font-size: 30px;"></i><br><br><p>Your password has been successfully updated...</p>');
                $state.go('home');
            }
        })
        .error(function (error)
        {
            $rootScope.hide();
            $rootScope.notify('<i class="ion-alert-circled" style="font-size: 30px;"></i><br><br><p>Connection error. Please try again later...</p>');
        });
    };

    $scope.Recoverpass = function ()
    {
        var usr_email  = this.user.email;
        var usr_pass= Math.round((Math.random() * 100000));

        if(!usr_email)
        {
            $rootScope.notify('<i class="ion-alert-circled" style="font-size: 30px;"></i><br><br><p>Enter your email.</p>');
            return false;
        }

        $rootScope.show('<i class="ion-loading-a" style="font-size: 30px;"></i><br><br><p>Loading your information...</p>');

        API.recover_pass({
            u_email: usr_email,
            u_pass: usr_pass,
            u_pass_enc: calcMD5(usr_pass+"ZrX@s5AF*7zu")
        })
        .success(function (data)
        {
            //console.log('Data in Controller Recover Password:', data);

            if(data == 0)
            {
                $rootScope.notify('<i class="ion-alert-circled" style="font-size: 30px;"></i><br><br><p>This email address is not registered...</p>');
                return false;
            }
            else
            {
                // Ocultamos el Aviso de Conectando y redireccionamos a la Pagina de Inicio
                $rootScope.hide();

                $rootScope.notify('<i class="ion-checkmark-circled" style="font-size: 30px;"></i><br><br><p>An email with the information to reset your account has been sent.</p>');
                $state.go('sign-in');
            }
        })
        .error(function (error)
        {
            $rootScope.hide();
            $rootScope.notify('<i class="ion-alert-circled" style="font-size: 30px;"></i><br><br><p>Connection error. Please try again later...</p>');
        });
    }       
})

//***************************************************************************************************************************
// Delete Perfil Controller
//***************************************************************************************************************************
.controller('DeletePerfilCtrl', function ($rootScope, $scope, API, $window, $state){
    $scope.user = {
        id: ""
    };

    $scope.goState = function (state) {
        $state.go(state);
    };

    $scope.Deleteuser = function (usr_id)
    {
            $rootScope.show('<i class="ion-loading-a" style="font-size: 30px;"></i><br><br><p>Delete Account...</p>');

            API.delete_user({
                u_id: usr_id
            })
            .success(function (data)
            {
                // Valor que Valido el Servidor (Registro o No al Nuevo Usuario)
                //console.log('Data in Controller Delete Perfil:', data);

                // Borramos la Sesion
                $rootScope.setToken("","","","","","","","","","","");
                $('#d_edit').css('display','none');
                $('#d_logout').css('display','none');
                $('#d_active').css('display','none');
                $('#d_inactive').css('display','none');
                $('#btn_footer').css('display','none');

                // Ocultamos el Aviso de Conectando y redireccionamos a la Pagina de Inicio
                $rootScope.hide();

                $rootScope.notify('<i class="ion-checkmark-circled" style="font-size: 30px;"></i><br><br><p>Your profile has been successfully eliminated...</p>');
                $state.go('sign-in');
            })
            .error(function (error)
            {
                $rootScope.hide();
                $rootScope.notify('<i class="ion-alert-circled" style="font-size: 30px;"></i><br><br><p>Connection error. Please try again later...</p>');
            });
    }
})


//***************************************************************************************************************************
// Edit Driver Perfil Controller
//***************************************************************************************************************************
.controller('EditPerfilCtrl', function ($rootScope, $scope, API, $window, $state)
{
    $scope.driver = {
        email: "",
        phone:"",
        cabmodel:"",
        cabmaker:"",
        cabyear:"",
        cabboard:"",
        cabnumber:""
    };

    $scope.goState = function (state) {
        $state.go(state);
    };

    $scope.Editdriver = function ()
    {
        var dvr_fname = this.driver.first_name;
        var dvr_lname = this.driver.last_name;
        var dvr_email = this.driver.email;
        var dvr_phone = this.driver.phone;
        var dvr_model = this.driver.cabmodel;
        var dvr_maker = this.driver.cabmaker;
        var dvr_cyear = this.driver.cabyear;
        var dvr_board = this.driver.cabboard;
        var dvr_cnumb = this.driver.cabnumber;
        var dvr_id    = $rootScope.getUId();

        if(!dvr_fname && !dvr_lname && !dvr_email && !dvr_phone && !dvr_model && !dvr_maker && !dvr_cyear && !dvr_board && !dvr_cnumb)
        {
            $rootScope.notify('<i class="ion-alert-circled" style="font-size: 30px;"></i><br><br><p>No change required.</p>');
            return false;
        }
        else
        {
            if(!dvr_fname) { dvr_fname = $rootScope.getUFName() }
            if(!dvr_lname) { dvr_lname = $rootScope.getULName() }
            if(!dvr_email) { dvr_email = $rootScope.getToken()  }
            if(!dvr_phone) { dvr_phone = $rootScope.getUphone() }
            if(!dvr_model) { dvr_model = $rootScope.getCmodel() }
            if(!dvr_maker) { dvr_maker = $rootScope.getCmaker() }
            if(!dvr_cyear) { dvr_cyear = $rootScope.getCyear()  }
            if(!dvr_board) { dvr_board = $rootScope.getCboard() }
            if(!dvr_cnumb) { dvr_cnumb = $rootScope.getCnum()   }
        }

        $rootScope.show('<i class="ion-loading-a" style="font-size: 30px;"></i><br><br><p>Updating your information...</p>');

        API.edit_driver({
            d_id: dvr_id,
            fname: dvr_fname,
            lname: dvr_lname,
            email: dvr_email,
            phone: dvr_phone,
            model: dvr_model,
            maker: dvr_maker,
            cyear: dvr_cyear,
            board: dvr_board,
            cnumb: dvr_cnumb
        })
        .success(function (data)
        {
            // Valor que Valido el Servidor (Registro o No al Nuevo Usuario)
            console.log('Data in Controller Edit Driver:', data);

            // Actualizamos la Sesion
            $rootScope.updateToken(dvr_fname, dvr_lname, dvr_email, dvr_phone, '1', dvr_model, dvr_maker, dvr_cyear, dvr_board, dvr_cnumb);

            // Ocultamos el Aviso de Conectando y redireccionamos a la Pagina de Inicio
            $rootScope.hide();
            $('#d_edit').css('display','block');
            $('#d_logout').css('display','block');
            $('#d_active').css('display','block');
            $('#d_inactive').css('display','none');
            $('#btn_footer').css('display','block');
            $rootScope.ActiveDriver();
            $window.location.href = ('#/home');
            
        })
        .error(function (error)
        {
            $rootScope.hide();
            $rootScope.notify('<i class="ion-alert-circled" style="font-size: 30px;"></i><br><br><p>Connection error. Please try again later...</p>');
        });
    }
        
})

//***************************************************************************************************************************
// SignUp Controller
//***************************************************************************************************************************
.controller('SignUpCtrl', function ($rootScope, $scope, API, $window, $state)
{
    $('#d_back').css('display','block');
    $scope.user = {
        first_name: "",
        last_name:"",
        email: "",
        phone:"",
        cabmodel:"",
        cabmaker:"",
        cabyear:"",
        cabboard:"",
        cabnumber:"",
        password1: "",
        password2: ""
    };

    $scope.createUser = function ()
    {
        var su_fname = this.user.first_name;
        var su_lname = this.user.last_name;
        var su_email = this.user.email;
        var su_phone = this.user.phone;
        var su_model = this.user.cabmodel;
        var su_maker = this.user.cabmaker;
        var su_cyear = this.user.cabyear;
        var su_board = this.user.cabboard;
        var su_cnumb = this.user.cabnumber;
        var su_pass1 = this.user.password1;
        var su_pass2 = this.user.password2;

        if(!su_fname || !su_email || !su_pass1 || !su_pass2 || !su_phone || !su_model || !su_maker || !su_cyear || !su_board || !su_cnumb)
        {
            $rootScope.notify('<i class="ion-alert-circled" style="font-size: 30px;"></i><br><br><p>Please fill in all the required fields(*)</p>');
            return false;
        }

        if(su_pass1 != su_pass2)
        {
            $rootScope.notify('<i class="ion-alert-circled" style="font-size: 30px;"></i><br><br><p>Passwords must match.</p>');
            return false;
        }

        $rootScope.show('<i class="ion-loading-a" style="font-size: 30px;"></i><br><br><p>Please wait...</p>');

        API.signup({
            fname: su_fname,
            lname: su_lname,
            email: su_email,
            phone: su_phone,
            pass1: calcMD5(su_pass1+"ZrX@s5AF*7zu"),
            model: su_model,
            maker: su_maker,
            cyear: su_cyear,
            board: su_board,
            cnumb: su_cnumb
        })
        .success(function (data)
        {
            // Valor que Valido el Servidor (Registro o No al Nuevo Usuario)
            console.log('Data in Controller Signup:', data);

            if(data == 0)
            {
                $rootScope.notify('<i class="ion-alert-circled" style="font-size: 30px;"></i><br><br><p>This email has already been used.</p>');
                return false;
            }
            else
            {
                // Creamos la Sesion
                //$rootScope.setToken(su_fname, su_lname, su_email, su_phone, '1', data[0].id, su_model, su_maker, su_cyear, su_board, su_cnumb);

                $rootScope.hide();

                $rootScope.notify('<i class="ion-alert-circled" style="font-size: 30px;"></i><br><br><p>A confirmation mail has been sent to your e-mail. Please validate your account...</p>');
                $window.location.href = ('#/sign-in.html');

                // Ocultamos el Aviso de Conectando y redireccionamos a la Pagina de Inicio
                /*$rootScope.hide();
                 $('#d_edit').css('display','block');
                $('#d_logout').css('display','block');
                $('#d_active').css('display','block');
                $('#d_inactive').css('display','none');
                $('#btn_footer').css('display','block');
                $rootScope.ActiveDriver();*/
                //$window.location.href = ('#/home');
            }
        })
        .error(function (error)
        {
            $rootScope.hide();
            $rootScope.notify('<i class="ion-alert-circled" style="font-size: 30px;"></i><br><br><p>Connection error. Please try again later...</p>');
        });
    }
})

//***************************************************************************************************************************
// HomeCtrl Controller
//***************************************************************************************************************************
.controller('HomeCtrl', function ($rootScope, $scope, API, $timeout, $ionicModal, $window, $http, $ionicPopup, $state) {

    $('#d_back').css('display','none');

    if ($rootScope.isSessionActive()) {

        var driver_status = $rootScope.isDriverActive();
            
        driver_status
        .success(function (data)
        {
            //console.log('Driver Status:', data);
            //console.log('Data Active:',data[0].active);
        
            if (data[0].active==1) 
            {
                //console.log('Driver Activo');
                $('#d_edit').css('display','block');
                $('#d_logout').css('display','block');
                $('#d_active').css('display','block');
                $('#d_inactive').css('display','none');
                $('#btn_footer').css('display','block');
                
                $rootScope.startGeolocation();
            }
            else
            {
                //console.log('Driver No Activo');
                $('#d_edit').css('display','block');
                $('#d_logout').css('display','block');
                $('#d_active').css('display','none');
                $('#d_inactive').css('display','block');
                $('#btn_footer').css('display','block');
            
                //Boton Activar
                $('#btn_active_y').css('display','none');
                $('#btn_active_n').css('display','block');

                //Boton Desactivar
                $('#btn_inactive_n').css('display','none');
                $('#btn_inactive_y').css('display','block');
            }
        });
    }

    // popup de Confirmacion
    $rootScope.showConfirm = function(msg)
    {
        $scope.sendRejected = 1;
        $rootScope.clientAddres = msg.address;
        $rootScope.clientRef = msg.ref;
        var confirmPopup = $ionicPopup.confirm(
        {
            title: 'New Taxi Request',
            templateUrl: 'templates/confirm-popup.html',
            okText: 'Accept',
            cancelText: 'Reject'

        });
        confirmPopup.then(function(res) {
            if(res)
            {
                console.log('Se Acepto la Solicitud');
                countDownVal = 1;
                $state.go('request-accepted');
                var req = {'clientId':msg.clientId,
                            'cabId':msg.cabId,
                            'info' : {'name':$rootScope.getUName() , 'phone':$rootScope.getUphone(), 'model':$rootScope.getCmodel(), 'plate':$rootScope.getCboard() , 'number':$rootScope.getCnum()}};
                $rootScope.socket.emit('confirm_taxi', req );
                $rootScope.currentClient = msg.clientId;
                $rootScope.hideDriver();
            }
            else
            {
                console.log('Se Rechazo la Solicitud');
                if($scope.sendRejected == 1){
                    $rootScope.socket.emit('reject_client', {'clientId':msg.clientId,'cabId':msg.cabId});
                }
                countDownVal = 1;
            }
        }, function(err) {
            console.log('Err:', err);
        }, function(popup) {});


        // Countdown routine
        var countDownVal = 15;
        $('#dCountDown').html(countDownVal);
        var timer1 = setInterval(function(){myTimer()},1000);
        function myTimer()
        {
            countDownVal--;
            $('#dCountDown').html(countDownVal);
            if (countDownVal == 0)
            {
                clearInterval(timer1); // this thing can be here, or not, it's OK
            }
        }

        //The Client cancelled
        $rootScope.socket.on('cancelled', function(msg) {
            $rootScope.notify('Client has cancelled');
            $window.location.href = ('#/home');
            $scope.sendRejected = 0;
            confirmPopup.close();
        });

        //Close the popup
        $timeout(function() {
            confirmPopup.close();
        }, 15000);
    };



})

//***************************************************************************************************************************
// Request Controller
//***************************************************************************************************************************
.controller('RequestCtrl', function ($rootScope, $scope, $timeout, $ionicPopup, $state) {

    $('#d_edit').css('display','none');
    $('#d_logout').css('display','none');
    $('#d_active').css('display','none');
    $('#d_inactive').css('display','none');
    $('#btn_footer').css('display','none');


    $timeout(function() {
        $('#atertClientBtn').toggleClass('button-outline').bind('touchstart',$rootScope.alertClient);
    }, 10000);

    $rootScope.finishRide = function()
    {
        var finishRidePopup = $ionicPopup.confirm(
            {
                title: 'Ride Finished',
                template: 'Are you sure?',
                okText: 'Yes',
                cancelText: 'No'
            });
        finishRidePopup.then(function(res) {
            if(res)
            {
                finishRidePopup.close();
                $rootScope.DesactiveDriver();
                $state.go('home');
            }else
            {
                finishRidePopup.close();
            }
        });
    }

});



