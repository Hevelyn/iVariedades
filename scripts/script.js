class Product {
  constructor() {
    this.id = 1;
    this.arrayProducts = [];
    this.editId = null;
  }

  save() {
    let product = this.readData();

    if (this.validateFields(product)) {
        if(this.editId == null){
            this.add(product);
            Swal.fire({
              icon: "success",
              title: "Produto salvo!",
            });
        }else {
            this.update(this.editId, product);
            Swal.fire({
                icon: "success",
                title: "Produto atualizado!",
              });
        }
    }

    this.listTable();
    this.cancel();
  }

  listTable() {
    let tbody = document.getElementById("tbody");
    tbody.innerText = "";

    for (let i = 0; i < this.arrayProducts.length; i++) {
      let tr = tbody.insertRow();

      let td_id = tr.insertCell();
      let td_produto = tr.insertCell();
      let td_price = tr.insertCell();
      let td_action = tr.insertCell();

      td_id.innerText = this.arrayProducts[i].id;
      td_produto.innerText = this.arrayProducts[i].nameProduct;
      td_price.innerText = this.arrayProducts[i].price;

      td_id.classList.add("center");
      td_action.classList.add("actions");

      let imgEdit = document.createElement("img");
      imgEdit.src = "/assets/icons/edit.png";
      imgEdit.setAttribute("onclick", "product.edit("+ JSON.stringify(this.arrayProducts[i]) +")")
      td_action.appendChild(imgEdit);

      let imgDelete = document.createElement("img");
      imgDelete.src = "/assets/icons/delete.png";
      imgDelete.setAttribute( "onclick","product.delete(" + this.arrayProducts[i].id + ")");
      td_action.appendChild(imgDelete);
    }
  }

  add(product) {
    this.arrayProducts.push(product);
    this.id++;
  }

  readData() {
    let product = {};

    product.id = this.id;
    product.nameProduct = document.getElementById("product").value;
    product.price = document.getElementById("price").value;

    return product;
  }

  validateFields(product) {
    let msg = "";
    if (product.nameProduct == "") {
      msg += " - Informe o nome do Produto \n";
    }
    if (product.price == "") {
      msg += " - Informe o preço \n";
    }
    if (msg != "") {
      Swal.fire({
        icon: "warning",
        title: msg,
      });
      return false;
    }
    return true;
  }

  cancel() {
    document.getElementById("product").value = "";
    document.getElementById("price").value = "";

    document.getElementById('btn-save').innerText = 'Salvar';
    this.editId = null
  }

  delete(id) {
    let tbody = document.getElementById("tbody");

    Swal.fire({
      title: "Tem certeza que deseja excluir esse produto?",
      text: "Essa ação será irreversível!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
    }).then((result) => {
      if (result.isConfirmed) {
        for (let i = 0; i < this.arrayProducts.length; i++) {
          if (this.arrayProducts[i].id == id) {
            this.arrayProducts.splice(i, 1);
            tbody.deleteRow(i)
          }
        }
        Swal.fire(`Seu produto foi excluido com sucesso!`);
      }
    });
  }

  update(id, product){
    for(let i = 0; i < this.arrayProducts.length; i++){
        if(this.arrayProducts[i].id == id){
            this.arrayProducts[i].nameProduct = product.nameProduct;
            this.arrayProducts[i].price = product.price;
        }
    }
  }

  edit(data){
    this.editId = data.id;

    document.getElementById('product').value = data.nameProduct
    document.getElementById('price').value = data.price
    document.getElementById('btn-save').innerText = 'Atualizar'
  }
}

let product = new Product();