describe("acceptance tests", function() {
	describe("real world examples", function() {
		it("should be able to handle complex dsl", function() {
			app(function() {});
			
			screen({ id: "home", text: "Space Hunter" }, function() {
				header(function() {
				});
				table(function() {
					row({ text: "Browse rooms", openScreen: "browse" });
					row({ text: "Rooms nearby", openScreen: "rooms-trondheim" });
					row({ text: "Favourite rooms", openScreen: "favourites" });
				});
			});

			screen({ id: "browse", text: "Browse rooms" }, function() {
				header(function() {
					button("Back");
					button("Home");
				});
				table(function() {
					row({ text: "Bergen" });
					row({ text: "Stavanger" });
					row({ text: "Trondheim", openScreen: "rooms-trondheim" });
					row({ text: "Oslo " });
				});
			});

			roomsScreen("rooms-trondheim", "Trondheim", [
				{ text: "Block 1", openScreen: "rooms-trondheim-block1" },
				{ text: "Block 2" },
				{ text: "Block 3" }
			]);

			roomsScreen("rooms-trondheim-block1", "Block 1", [
				{ text: "First floor" },
				{ text: "Second floor" },
				{ text: "Third floor" }
			]);

			roomsScreen("favourites", "Favourites", [
				{ text: "Yggadrasil, Trondheim" },
				{ text: "Heidrum, Trondheim" }
			]);

			function roomsScreen(id, text, rooms) {
				screen({ id: id, text: text }, function() {
					header(function() {
						button("Back");
						button("Home");
					});
					
					table(function() {
						for (var i = 0; i < rooms.length; i++) {
							row(rooms[i]);
						}
					});
				});
			}

			var appObj = workstation.ast();
			expect(appObj.numberOfScreens()).toEqual(5);
			expect(appObj.getScreen(0).numberOfWidgets(2));	
			expect(appObj.getScreen(0).getWidget(0).type).toEqual("header");
			expect(appObj.getScreen(0).getWidget(1).type).toEqual("table");
			
			expect(appObj.getScreen(1).numberOfWidgets()).toEqual(2);
		});
	});
});
