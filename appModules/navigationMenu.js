function NavigationMenu(baseURL){
	this.menu = [
					{
						code: 'home', 
						label: "Home", 
						iconClass: "glyphicon glyphicon-home", 
						url: baseURL+"./home/", 
						isActive: false
					},
					{
						code: 'area',
						label: 'Territorio',
						iconClass: "glyphicon glyphicon-globe", 
						isActive: false,
						subMenu: [
							{
								code: 'positions',
								label: 'Posizioni',
								url: baseURL+"./area/positions/",
								isActive: false
							},
							{
								code: 'workingToEffective',
								label: 'WorkingToEffective',
								url: baseURL+"./area/workingToEffective/",
								isActive: false
							},
							{
								code: 'division',
								label: 'Crea Divisione',
								url: baseURL+"./area/division/",
								isActive: false	
							},
							{
								code: 'exportAreaStruct',
								label: 'Esporta Struttura Territoriale',
								url: baseURL+"./area/exportAreaStruct/",
								isActive: false
							}
						]
					},
					{
						code: 'products', 
						label: "Prodotti", 
						iconClass: "glyphicon glyphicon-heart", 
						isActive: false,
						subMenu: [
							{
								code: 'productContribution', 
								label: "Product Contribution", 
								url: baseURL+"./products/productContribution/", 
								isActive: false
							},
							{
								code: 'macroProdGroup', 
								label: "Macro Product Group", 
								url: baseURL+"./products/macroGroup/", 
								isActive: false
							},
							{
								code: 'macroProdGroupITS', 
								label: "Macro Product Group ITS", 
								url: baseURL+"./products/macroGroupITS/", 
								isActive: false
							},
							{
								code: 'factorConversionAndAvgPrice', 
								label: "Fattori di Conversione e Prezzo Medio", 
								url: baseURL+"./products/factorConversionAndAvgPrice/", 
								isActive: false
							},
							{
								code: 'imsOneLillyProductCodeMatch', 
								label: "IMS-OneLilly Product Code Match", 
								url: baseURL+"./products/productCodeMatch/", 
								isActive: false
							},
							{
								code: 'dmMatch', 
								label: "Associazioni Divisioni-Mercato", 
								url: baseURL+"./products/dmMatch/", 
								isActive: false
							},
							{
								code: 'manageProduct', 
								label: "Gestione Prodotti", 
								url: baseURL+"./products/", 
								isActive: false
							}
						]
					},
					{
						code: 'loadingData', 
						label: "Caricamento Dati", 
						iconClass: "glyphicon glyphicon-upload", 
						isActive: false,
						subMenu: [
							{
								code: 'salesPlan',
								label: "Sales Plan da CSV", 
								url: baseURL+"./loadingData/salesPlanCsv/", 
								isActive: false
							},
							{
								code: 'imsSalesOneLilly',
								label: "IMS Sales to OneLilly", 
								url: baseURL+"./loadingData/imsSalesOneLilly/", 
								isActive: false
							}
						]
					},
					{
						code: 'reportManagement', 
						label: "Report", 
						iconClass: "glyphicon glyphicon-list-alt", 
						isActive: false,
						subMenu: [
							{
								code: 'parameters',
								label: "Gestione Parametri", 
								url: baseURL+"./reportManagement/parameters/", 
								isActive: false
							},
							{
								code: 'parametersITS',
								label: "Gestione Parametri ITS", 
								url: baseURL+"./reportManagement/parametersITS/", 
								isActive: false
							}
							,
							{
								code: 'dailyElaboration',
								label: "Gestione Elaborazione Daily", 
								url: baseURL+"./reportManagement/dailyElaboration/", 
								isActive: false
							},
							{
								code: 'massivePrint',
								label: "Stampa Massiva", 
								url: baseURL+"./reportManagement/massivePrint/", 
								isActive: false
							}
						]
					},
					{
						code: 'management', 
						label: "Management", 
						iconClass: "glyphicon glyphicon-briefcase",
						isActive: false,
						subMenu: [
							{
								code: 'warehouse',
								label: "Anagrafica Magazzino", 
								url: baseURL+"./management/warehouse/", 
								isActive: false
							},
							{
								code: 'addressAndContact', 
								label: "Anagrafica Utenti", 
								url: baseURL+"./management/addressAndContact/", 
								isActive: false
							},
							{
								code: 'controlPanel', 
								label: "Pannello di controllo", 
								url: baseURL+"./management/ctrlPanel/", 
								isActive: false
							}
						]
					}
				];
}

NavigationMenu.prototype.getMenuConf = function(pageCode) {
	for ( var v = 0; v < this.menu.length; v++ ) {
		if (this.menu[v].code === pageCode )
			this.menu[v].isActive = true;
		if (this.menu[v].subMenu !== undefined)
			for ( var sv = 0; sv < this.menu[v].subMenu.length; sv++)
				if (this.menu[v].subMenu[sv].code === pageCode ) {
					this.menu[v].isActive = true;
					this.menu[v].subMenu[sv].isActive = true;
				}
	}
	return this.menu;
};

module.exports = NavigationMenu;