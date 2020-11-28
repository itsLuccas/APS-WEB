var reinitDb = 0;
var db = openDatabase("mybase", "1.0", "Mybase", 2 * 1024 * 1024);
db.transaction(function(criar) {
    criar.executeSql("CREATE TABLE users (id INTEGER PRIMARY KEY , nome TEXT, ra INTEGER, senha TEXT)");
});

if (reinitDb) {
	db.changeVersion(db.version, '', function(t) {
		t.executeSql("SELECT name FROM sqlite_master WHERE type='table' and name not like '__Webkit%'", [], function(sqlTransaction, sqlResultSet) {
			var table, tablesNumber = sqlResultSet.rows.length;
			console.log('DATABASE RESET MODE ENABLED');
			for (var i = 0; i < tablesNumber; i++) {
				table = sqlResultSet.rows.item(i);
				console.log('Removing table: ' + table.name);
				sqlTransaction.executeSql('DROP TABLE ' + table.name);
			}
		});
	});
}