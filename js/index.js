/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = $.mobile.GapNote = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // This is an event handler function, which means the scope is the event.
        // So, we must explicitly called `app.report()` instead of `this.report()`.
        app.report('deviceready');
    },
    report: function(id) {
        // Report the event in the console
        console.log("Report: " + id);

        // Toggle the state from "pending" to "complete" for the reported ID.
        // Accomplished by adding .hide to the pending element and removing
        // .hide from the complete element.
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    },
	MsgBox : function (Message){
		$("#msgBox_Message").html(Message)
		$("#positionWindow").popup("open");
	},
	callremote: function (){
		
	},
	buscaCURP_by_CURP : function(){
		var CURP = $('#txtCURP').val();
		if (CURP.length == 0 ) {			
			this.MsgBox("Falta introducir la CURP...");
		} else if (CURP.length != 18) {
			this.MsgBox("Formato de CURP incorrecto, favor de revisar...");
		} else {		
			var 
				usr = "xmalmorthen",
				pwd = "b16f550d147bf92e9455074d9edfe013",
				server = "http://" + usr + ":" + pwd + "@wsrenapo.col.gob.mx/curp2",
			    service = "CURP",
				method = "getInfo",
				call = server + "/" + service + "/" + method + "/" + CURP;							
							
				var jqxhr = $.get(call, function(data) {
					//console.log (data);
					app.MsgBox("Correcto");
				}, "json")
				.fail(function() { 				
					app.MsgBox("Ocurrió un error al intentar conectar con el servidor...");				
				});			
		}		
	}
};