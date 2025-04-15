using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SmartCitizenDemo.Models
{
    public class Client
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "হোল্ডারের নাম আবশ্যক")]
        [Column(TypeName = "nvarchar(100)")]
        [Display(Name = "হোল্ডারের নাম")]
        public string HolderName { get; set; }

        [Required(ErrorMessage = "পিতার/স্বামীর নাম আবশ্যক")]
        [Column(TypeName = "nvarchar(100)")]
        [Display(Name = "পিতা/স্বামী")]
        public string FatherOrHusbandName { get; set; }

        [Required(ErrorMessage = "মাতার নাম আবশ্যক")]
        [Column(TypeName = "nvarchar(100)")]
        [Display(Name = "মাতার নাম")]
        public string MotherName { get; set; }

        [Required(ErrorMessage = "এনএনআইডি নম্বর আবশ্যক")]
        [Column(TypeName = "nvarchar(20)")]
        [Display(Name = "এনএনআইডি নম্বর")]
        public string NIDNumber { get; set; }

        [Required(ErrorMessage = "হোল্ডিং নম্বর আবশ্যক")]
        [Display(Name = "হোল্ডিং নম্বর")]
        public int HoldingNumber { get; set; }

        [Required(ErrorMessage = "ওয়ার্ড নম্বর আবশ্যক")]
        [Display(Name = "ওয়ার্ড নম্বর")]
        public int WardNumber { get; set; }

        [Required(ErrorMessage = "গ্রামের নাম আবশ্যক")]
        [Column(TypeName = "nvarchar(100)")]
        [Display(Name = "গ্রাম/পাড়া")]
        public string Village { get; set; }

    }

}
