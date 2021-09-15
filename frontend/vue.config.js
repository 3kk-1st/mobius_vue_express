module.exports = {
	devServer:{
	 proxy: {
	  '/api':{
		  target : 'http://localhost:3000/api',
		  changeOrigin: ture,
		  pathRewirte: {
			  '^/api':''
		  }
	  }
	 }
	},
	outputDir: '/home/ebichu/mobius_vue_express/backend/public',
}
