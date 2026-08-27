function agregarFotosFijas(idContenedor, prefijo, cantidad) {
    var contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;
    
    for (var i = 1; i <= cantidad; i++) {
        var item = document.createElement("div");
        item.className = "gallery-item";
        
        var img = document.createElement("img");
        img.src = "imagenes/" + prefijo + i + ".jpg";
        img.setAttribute("onclick", "zoomImage(this)");
        
        // Parche detector de extensiones (.jpg, .jpg.jpg, .png, .jpeg)
        img.onerror = (function(c, p, n, divItem) {
            return function() {
                if (this.src.endsWith(".jpg")) {
                    this.src = "imagenes/" + p + n + ".jpg.jpg";
                } else if (this.src.endsWith(".jpg.jpg")) {
                    this.src = "imagenes/" + p + n + ".png";
                } else if (this.src.endsWith(".png")) {
                    this.src = "imagenes/" + p + n + ".jpeg";
                } else {
                    divItem.style.display = "none";
                }
            };
        })(idContenedor, prefijo, i, item);
        
        item.appendChild(img);
        contenedor.appendChild(item);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    agregarFotosFijas("ilustracion", "ilustracion", 15);
    agregarFotosFijas("pintura", "pintura", 15);
    agregarFotosFijas("tattoo", "tattoo", 15);
});

function openGallery(categoryName, element) {
    var galleries = document.getElementsByClassName("gallery-wrapper");
    for (var i = 0; i < galleries.length; i++) { galleries[i].style.display = "none"; }
    var buttons = document.getElementsByClassName("tab-btn");
    for (var i = 0; i < buttons.length; i++) { buttons[i].classList.remove("active"); }
    document.getElementById(categoryName).style.display = "grid";
    element.classList.add("active");
}

function zoomImage(imgElement) {
    var lightbox = document.getElementById("imageLightbox");
    var zoomedImg = document.getElementById("zoomedImg");
    lightbox.style.display = "flex";
    zoomedImg.src = imgElement.src;
}

function closeZoom() {
    document.getElementById("imageLightbox").style.display = "none";
}
