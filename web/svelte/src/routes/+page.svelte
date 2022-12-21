<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

<script lang="ts">
type Profile = {
	href: string;
	title: string;
};
let profiles: Profile[] = [];
</script>

<div class="bg-hero h-screen overflow-hidden bg-black bg-cover bg-center bg-no-repeat">
	<div class="h-screen overflow-auto bg-black/75">
		<div class="container mx-auto py-16">
			<div class="mx-auto max-w-fit">
				<div class="flex flex-col items-center justify-center gap-8">
					<div class="w-full">
						<div class="pb-full relative w-full rounded-full bg-white">
							<div class="absolute top-0 left-0 h-full w-full">
								<div class="flex h-full w-full items-center justify-center">
									<!-- <FaUser class="text-black text-8xl" /> -->
								</div>
							</div>
						</div>
					</div>
					<div>
						<h1 class="text-4xl uppercase text-white">HIEU DOAN</h1>
					</div>
					<div class="w-full">
						<!-- <Button href="/about">About</Button> -->
					</div>
					{#each profiles as profile}
						<div class="w-full">
							<!-- <Button href={profile.href}>{profile.title}</Button> -->
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
