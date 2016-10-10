$.getJSON('./data/wordcloud',null,function(data){
  WordCloud(document.getElementById('wordcloud'), {
  list: data,
  fontFamily: 'Times, serif',
  rotateRatio: 0.5,
  backgroundColor: '#e0e0e0',
  minSize:10
});

})
console.log('suc')