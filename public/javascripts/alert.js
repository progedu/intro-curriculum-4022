document.alert.btn.addEventListener('click', function() {
    var result = window.confirm('本当に削除してよろしいですか？');

    if (result) {
        document.alert.submit();
    } else {
        location='/';
    }

})