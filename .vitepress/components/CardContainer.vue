<template>
  <div class="container flex flex-wrap justify-center mx-auto gap-x-4">
    <ArticleCard
      v-for="article in sortedArticles"
      :key="article.link"
      :title="article.frontmatter.title"
      :author="article.frontmatter.author"
      :date="article.date.string"
      :desc="article.frontmatter.description"
      :tags="formatTags(article.frontmatter.tags)"
      :link="article.link"
    />
  </div>
</template>

<script setup lang="ts">
import ArticleCard from "./ArticleCard.vue";
import { data as articles } from "../data/articles.data";

// -------------------------------
//  Automatic date sorting (ASC)
//  最旧 → 最新
// -------------------------------
const sortedArticles = articles.sort((a, b) => {
  return new Date(a.date.string).getTime() - new Date(b.date.string).getTime();
});

function formatTags(tags: string) {
  return tags ? tags.split("/") : [];
}
</script>

