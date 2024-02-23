<template>
  <view class="page">
    <examination-cell v-if="type=='document'" :content="documentData"></examination-cell>
    <question-cell v-if="type=='question'" :content="questionData"></question-cell>
  </view>
</template>

<script>
import ExaminationCell from "@/components/examination-cell/index.vue";
import QuestionCell from "@/components/question-cell/index.vue";
import { share } from "$utils/index.js";
import apis from "$apis/index.js";

export default {
  components: {
    ExaminationCell,
    QuestionCell,
  },
  data() {
    return {
      type: "",
      documentData: {
        id: null,
        name: "",
        answer_document_id: null,
      },
      questionData: {
        id: null,
        question_txt: "",
        category: "",
      },
    };
  },
  onLoad(option) {
    console.log(option);
    if (option.type == "document") {
      this.type = "document";
      this.documentData = {
        id: decodeURIComponent(option.id),
        name: decodeURIComponent(option.name),
        is_collect: 0,
        answer_document_id: decodeURIComponent(option.answer_document_id),
      };
    } else if (option.type == "question") {
      this.type = "question";
      this.questionData = {
        id: decodeURIComponent(option.id),
        question_txt: decodeURIComponent(option.question_txt || "") || "",
        question_img: decodeURIComponent(option.question_img || "") || "",
        is_collect: 0,
        category: decodeURIComponent(option.category),
      };
    }
    if (option.share_token) {
      this.shareSuccess(option.share_token);
    }
  },
  methods: {
    shareSuccess(shareToken) {
      apis.shareSuccess({
        shareToken,
      });
    },
  },
  onShareAppMessage: function (res) {
    return share(res);
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
}
</style>