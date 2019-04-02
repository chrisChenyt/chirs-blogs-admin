<template>
    <div class = "ue-box">
        <UE :config = config ref = "ue" ></UE>
    </div>
  </div>
</template>
<script>
  import UE from '../components/UE/UEditorEdit.vue'
  export default {
    components:{
      UE
    },
    data() {
      return {
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350,
          toolbars: [['source', '|', 'undo', 'redo', '|','bold', 'italic', 'underline',  'strikethrough','superscript', 'subscript', '|', 'forecolor', 'backcolor','selectall', 'removeformat','|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|','lineheight','insertorderedlist', 'insertunorderedlist','imagenone', 'imageleft', 'imageright', 'imagecenter', '|','simpleupload',  'insertimage','emotion', 'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|', 'link','anchor', '|','attachment','insertcode', 'horizontal','spechars', '|', 'searchreplace', 'drafts']]
        }
      }
    },
    mounted(){
    },
    methods: {
    }
  }
</script>
<style lang = "less">
    .ue-box{
      background: #22222c;
    }
</style>