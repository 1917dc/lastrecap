<div class="prose mt-32 m-auto select-none">
	<h1 class="text-primary text-center pt-10 mb-0">lastrecap</h1>
	<div class="text-center">
		<form class="form-control pl-20 pr-20 pt-10" action="/user" method="post">
			<input class="input input-bordered text-white text-center mb-5" type="text" name="user" placeholder="username">
			<select class="select select-bordered text-center mb-5" name="period">
				<option value="1month">1 month</option>
				<option value="6month">6 months</option>
				<option value="12month">12 months</option>
			</select>
			<select class="select select-bordered text-center mb-5" name="limit">
				<option value="9">3x3</option>
				<!--<option value="16" disabled>4x4 (wip)</option>
				<option value="25" disabled>5x5 (wip)</option>-->
			</select>
			<button class="btn btn-primary" type="submit">recap</button>
		</form>
	</div>
</div>
