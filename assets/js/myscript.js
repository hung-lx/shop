jQuery(document).ready(function($) {
  $('.updatecart').click(function(event) {
    var rowid = $(this).attr('id');
    var qty = $(this).parent().parent().find('.qty').val();
    var token = $("input[name='_token']").val();
    $.ajax({
      url: 'cap-nhat/' + rowid + '/' + qty,
      type: 'GET',
      cache: false,
      data: {
        '_token': token,
        'id': rowid,
        'qty': qty
      },
      success: function(result) {
        result = JSON.parse(result);
        var html = "";
        html = html + result[0] + ' VND';
        //$("#datalist-result").html(html);
        // console.log(result);
        $('#' + rowid).parent().next().next().html(html);
        $('#totalamout').html(result[1] + ' VND');
      }
    });
  });
  $('.deletecart').click(function(event) {
    var rowid = $(this).attr('id');
    var token = $("input[name='_token']").val();
    $.ajax({
      url: 'xoa-san-pham-ajax/' + rowid,
      type: 'GET',
      cache: false,
      data: {
        '_token': token,
        'id': rowid,
      },
      success: function(result) {
        //$("#datalist-result").html(html);
        // console.log(result);
        $('#' + rowid).parent().parent().remove();
        if (result > 1) {
          $('#totalamout').html(result + ' D');
        } else {
          $('#cart-info').remove();
          $('#no-product').html('<p>Không có sản phẩm nào trong giỏ hàng. Vui lòng quay lại mua sắm !</p><p><a href="http://hunglx-laravel.pe.hu/"><input value="Tiếp tục mua sắm" class="btn btn-orange pull-left"></a></p>');
        }
      }
    });
  });
  $('.detail-aj').click(function(event) {
    var rowid = $(this).attr('id');
    //alert(rowid);
    $.ajax({
      url: 'detail/' + rowid,
      type: 'GET',
      cache: false,
      data: {
        'id': rowid,
      },
      success: function(result) {
        console.log(result);
        result = JSON.parse(result);
        // $('#quantity').html(result[0]);
        // $('#name').html(result[1]);
        // $('#price').html(result[2]);
        // $('#image').html(result[3]);
        // $('#total').html(result[0]*result[2]);
        var html = '';
        html += '<tr>';
        html += '<th>';
        html += 'STT';
        html += '</th>';
        html += '<th>';
        html += 'Hình ảnh';
        html += '</th>';
        html += '<th>';
        html += 'Tên sản phẩm';
        html += '</th>';
        html += '<th>';
        html += 'Số lượng';
        html += '</th>';
        html += '<th>';
        html += 'Đơn giá';
        html += '</th>';
        html += '<th>';
        html += 'Tổng tiền';
        html += '</th>';
        html += '<tr>';
        // Kết quả là một object json
        // Nên ta sẽ loop result
        $i = 0;
   
        $.each(result, function(key, item) {
          $i++;
          html += '<tr>';
          html += '<td>';
          html += $i;
          html += '</td>';
          html += '<td>';
          html += '<img width="80" height="80" src="';
          html += 'http://localhost/project_laravel/resources/upload/';
          html += item['image'];
          html += '">';
          html += '</td>';
          html += '</td>';
          html += '<td>';
          html += item['name'];
          html += '</td>';
          html += '<td>';
          html += item['qty'];
          html += '</td>';
          html += '<td>';
          html += item['price'];
          html += '</td>';
          html += '<td>';
          html += item['qty'] * item['price'];
          html += '</td>';
          html += '<tr>';
        });
        $('#table_aj').html(html);
      }
    });
  });
});


