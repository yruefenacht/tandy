<section class="admin">
    <h3>Product list</h3>
    <hr class="admin__hr">
    <ul class="admin_list">
        <?php foreach ($products as $product) : ?>
            <li><?= $product->Name?></li>
        <?php endforeach; ?>
    </ul>
    <ul class="admin__nav__ul">
        <li class="admin__nav_item">
            <a href="/admin">
                <div class="admin__nav__back__icon">
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                </div>
            </a>
        </li>
    </ul>
</section>