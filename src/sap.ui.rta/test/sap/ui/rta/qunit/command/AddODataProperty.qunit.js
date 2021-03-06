jQuery.sap.require("sap.ui.qunit.qunit-coverage");

sap.ui.define([
	'sap/ui/rta/command/CommandFactory',
	'sap/ui/rta/command/AddODataProperty',
	'sap/ui/dt/DesignTimeMetadata',
	'sap/ui/fl/registry/ChangeRegistry',
	'sap/ui/dt/ElementDesignTimeMetadata',
	'sap/ui/fl/Utils',
	'sap/m/Button',
	'sap/ui/thirdparty/sinon',
	'sap/ui/thirdparty/sinon-ie',
	'sap/ui/thirdparty/sinon-qunit'
],
function(
	CommandFactory,
	AddODataProperty,
	DesignTimeMetadata,
	ChangeRegistry,
	ElementDesignTimeMetadata,
	Utils,
	Button
) {
	"use strict";

	var oMockedAppComponent = {
		getLocalId: function () {
			return undefined;
		},
		getManifestEntry: function () {
			return {};
		},
		getMetadata: function () {
			return {
				getName: function () {
					return "someName";
				}
			};
		},
		getManifest: function () {
			return {
				"sap.app" : {
					applicationVersion : {
						version : "1.2.3"
					}
				}
			};
		}
	};
	sinon.stub(Utils, "getAppComponentForControl").returns(oMockedAppComponent);

	QUnit.module("Given an AddODataProperty change with a valid entry in the change registry,", {
		beforeEach : function(assert) {
			var oChangeRegistry = ChangeRegistry.getInstance();
			oChangeRegistry.registerControlsForChanges({
				"sap.m.Button" : {
					"addODataProperty" : {
						completeChangeContent: function() {
							assert.ok(true, "completeChangeContent was executed");
						},
						applyChange: function() {
							assert.ok(true, "applyChange was executed");
						}
					}
				}
			});

			this.oButton = new Button("button");

			this.oDesignTimeMetadata = new ElementDesignTimeMetadata({
				data : {
					actions : {
						addODataProperty : {
							changeType: "addODataProperty",
							isEnabled : true
						}
					}
				}
			});

		},
		afterEach : function(assert) {
		}
	});

	QUnit.test("when getting a AddODataProperty command for the change ...", function(assert) {
		assert.expect(3);

		var oCommand = CommandFactory.getCommandFor(this.oButton, "addODataProperty", {
				changeType : "addODataProperty",
				index : 1,
				newControlId : "newControlId",
				bindingPath : "{bindingPath}" }, this.oDesignTimeMetadata);

		assert.ok(oCommand, "the addODataProperty command exists");
		oCommand.execute();
	});

});
