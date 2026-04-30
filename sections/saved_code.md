{% assign sizes = product.options_with_values | where: 'name', 'Size' | first %}
{% assign colors = product.options_with_values | where: 'name', 'Color' | first %}


{{ "style.css" | asset_url | stylesheet_tag }}

<section>
    <div class="product-section">
        <div class="product-featured-task">
            {% if product.images.size > 0 %}
                {% for image in product.images %}
                    <img src="{{ image | image_url: width: 1000 }}" width="" height="" alt="">  
                {% endfor %}
            {% else %}
                {{ "product-1" | placeholder_svg_tag }}
            {% endif %}
        </div>
        <div class="product-content">
            <div class="product-content_title">
                {% if product.title != blank %}
                    <h2>{{ product.title }}</h2>
                {% endif %}
                {% if product.vendor != blank %}
                    <span>{{ product.vendor }}</span>
                {% endif %}
                    <div>
                        {% if product.compare_at_price != blank and product.compare_at_price > product.price %}
                            <div>
                                <span>Discount: {{ product.price | money }}</span>
                                <span class="product-old-price">Original Price: {{ product.compare_at_price | money }}</span>
                            </div>
                            {% else %}
                            <span>Price: {{ product.compare_at_price | money }}</span>
                        {% endif %}
                    </div>
            </div>
            <div class="product-content_variants">
                <div>
                    <span>Fit</span>
                    {% if sizes %}
                        <div class="product-fit_colors">
                            {% for value in sizes.values %}
                                <div class="product-variants">
                                    {{ value }}
                                </div>
                            {% endfor %}
                        </div>
                        {% endif %}
                </div>
                <div>
                    <p>Product metafield: {{ product.metafields.custom.warranty }}</p>
                    <div>
                        {% for variant in product.variants %}
                            {% if variant.metafields != blank %} 
                                <p>Variant metafield: {{ variant.metafields.custom.variant_single_line | metafield_tag }}</p> 
                            {% endif %}
                        {% endfor %}
                    </div>
                    <p>Collection metafield: {{ product.collections[4].metafields.custom.collection_single_line }}</p>
                </div>
                <div>
                    <span>Colors:</span>
                    
                    {% if colors %}
                        <div class="product-fit_colors">
                            {% for value in colors.values %}
                                <div class="product-variants colors" style="background-color: {{ value | downcase }}; padding: 10px 10px; border-radius: 10px"></div>
                            {% endfor %}
                        </div>
                        {% endif %}
                </div>
                <div>
                    <span>Tags</span>
                    {% if product.tags != nil %}
                        {% for tag in product.tags %}
                            <button class="product-variants button_class">{{ tag }}</button>
                        {% endfor %}
                    {% endif %}
                </div>
                <div>
                    {% if product.available == true %}
                        <div class="product-checkout">
                            <div>
                                <button>Add to bag</button>
                                <div>
                                    {% render 'icon-heart' %}
                                </div>
                            </div>
                            <div class="product-free_delivery">
                                <div>
                                    <button>Free delivery</button>
                                    <button>Free Returns</button>
                                </div>
                                <div>
                                    {% render 'icon-dropdown' %}
                                </div>
                            </div>
                        </div>
                    {% else %}
                        <button>Sold out</button>
                    {% endif %}
                </div>
                <div>   
                    <p>Product Details</p>
                    <div>
                        {% if product.description != blank %}
                            <p>
                                {{ product.description }}
                            </p>
                        {% endif %}
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script type="text/javascript">
  console.log({{ product | json }});
  console.log({{ product.metafields.custom.warranty | json }})
  console.log({{ product.collections | json }})
  
</script>


